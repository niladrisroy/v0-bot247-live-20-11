import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import * as cheerio from "cheerio"

// Helper function to resolve relative URLs to absolute URLs
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).href
  } catch (e) {
    console.warn(`Could not resolve URL: ${relativeUrl} with base ${baseUrl}`, e)
    return relativeUrl
  }
}

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { url } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    let response: Response
    try {
      response = await fetch(url, {
        signal: AbortSignal.timeout(15000),
      })
    } catch (fetchError: any) {
      console.error(`Network error fetching ${url}:`, fetchError)
      let errorMessage =
        "Could not reach the website. It might be down, the URL is incorrect, or it's blocking direct requests."
      if (fetchError.name === "AbortError") {
        errorMessage = "Request timed out while trying to reach the website."
      } else if (fetchError.message) {
        errorMessage += ` (${fetchError.message})`
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`HTTP error fetching ${url}: Status ${response.status}, Body: ${errorText.substring(0, 200)}...`)
      return NextResponse.json(
        {
          error: `Failed to fetch URL: ${response.status} ${response.statusText || ""}. The website might be blocking direct requests or the URL is invalid.`,
        },
        { status: response.status },
      )
    }

    const html = await response.text()

    const $ = cheerio.load(html)

    const title = $("title").text() || $("meta[property='og:title']").attr("content") || "No Title Found"
    const description =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      "No Description Found"

    const canonicalUrl = $("link[rel='canonical']").attr("href") || url
    const lang = $("html").attr("lang") || "en"
    const keywords = $("meta[name='keywords']").attr("content") || ""
    const ogImage = $("meta[property='og:image']").attr("content") || ""

    const headings: string[] = []
    $("h1, h2, h3, h4, h5, h6").each((_, element) => {
      const text = $(element).text().trim()
      if (text) {
        headings.push(text)
      }
    })

    const links: { href: string; text: string }[] = []
    $("a").each((_, element) => {
      const href = $(element).attr("href")
      const text = $(element).text().trim()
      if (href && text) {
        links.push({ href: resolveUrl(url, href), text })
      }
    })

    let mainText = ""
    $("script, style, noscript, header, footer, nav, aside").remove()

    const contentSelectors = "main, article, .main-content, .content, body"
    $(contentSelectors).each((_, element) => {
      $(element)
        .find("p, li, h1, h2, h3, h4, h5, h6, blockquote, pre")
        .each((_, textElement) => {
          const text = $(textElement).text().trim()
          if (text.length > 10) {
            mainText += text + "\n\n"
          }
        })
    })

    mainText = mainText.replace(/\s+/g, " ").trim()
    const MAX_TEXT_LENGTH = 10000
    if (mainText.length > MAX_TEXT_LENGTH) {
      mainText = mainText.substring(0, MAX_TEXT_LENGTH) + "..."
    } else if (mainText.length === 0) {
      mainText = "No substantial text found."
    }

    const images: { src: string; alt: string }[] = []
    $("img").each((_, element) => {
      const src = $(element).attr("src") || $(element).attr("data-src")
      const alt = $(element).attr("alt") || ""
      if (src) {
        images.push({ src: resolveUrl(url, src), alt })
      }
    })

    const structuredData: any[] = []
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const json = JSON.parse($(element).text())
        structuredData.push(json)
      } catch (e) {
        console.warn("Could not parse JSON-LD script:", e)
      }
    })

    const scrapedData = {
      title,
      description,
      canonicalUrl,
      lang,
      keywords,
      ogImage,
      headings,
      links,
      mainText,
      images,
      structuredData,
    }

    const { data, error: dbError } = await supabase.from("scraped_websites").upsert(
      {
        url: url,
        scraped_data: scrapedData,
      },
      { onConflict: "url" },
    )

    if (dbError) {
      console.error("Supabase upsert error:", dbError)
      return NextResponse.json({ error: "Failed to save or update scraped data in database." }, { status: 500 })
    }

    return NextResponse.json({ message: "URL scraped and saved/updated successfully", scrapedData })
  } catch (generalError: any) {
    console.error("General scraping or saving failed:", generalError)
    return NextResponse.json({ error: `An unexpected error occurred: ${generalError.message}` }, { status: 500 })
  }
}
