import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const searchParams = request.nextUrl.searchParams
    const chatbotId = searchParams.get("id")

    if (!chatbotId) {
      return NextResponse.json({ error: "Chatbot ID is required" }, { status: 400 })
    }

    const { data: configData, error: configError } = await supabase
      .from("chatbot_configurations")
      .select("*")
      .eq("chatbot_id", chatbotId)
      .single()

    if (configError) {
      console.error("Error fetching chatbot configuration:", configError)
      return NextResponse.json({ error: "Failed to fetch chatbot configuration" }, { status: 500 })
    }

    const { data: userData, error: userError } = await supabase
      .from("credentials")
      .select("chatbot_name")
      .eq("chatbot_id", chatbotId)
      .single()

    if (userError) {
      console.error("Error fetching user data:", userError)
    }

    const { data: themeData, error: themeError } = await supabase
      .from("chatbot_themes")
      .select("*")
      .eq("chatbot_id", chatbotId)
      .single()

    let formattedTheme = {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      borderRadius: 8,
      avatarUrl: "/abstract-ai-network.png",
      darkMode: false,
      responseTone: "friendly",
      responseLength: "concise",
    }

    if (themeData) {
      formattedTheme = {
        primaryColor: themeData.primary_color || formattedTheme.primaryColor,
        secondaryColor: themeData.secondary_color || formattedTheme.secondaryColor,
        borderRadius: themeData.border_radius || formattedTheme.borderRadius,
        avatarUrl: themeData.avatar_url || formattedTheme.avatarUrl,
        darkMode: themeData.dark_mode || formattedTheme.darkMode,
        responseTone: themeData.response_tone || formattedTheme.responseTone,
        responseLength: themeData.response_length || formattedTheme.responseLength,
      }
    }

    const { data: domainData, error: domainError } = await supabase
      .from("embed_domains")
      .select("domains")
      .eq("chatbot_id", chatbotId)
      .single()

    const referer = request.headers.get("referer")
    let isAllowedDomain = true

    if (domainData?.domains?.links && domainData.domains.links.length > 0) {
      isAllowedDomain = false

      if (referer) {
        try {
          const refererUrl = new URL(referer)
          const refererOrigin = refererUrl.origin

          isAllowedDomain = domainData.domains.links.some((domain: string) => {
            try {
              const domainUrl = new URL(domain)
              return domainUrl.origin === refererOrigin
            } catch (e) {
              return false
            }
          })
        } catch (e) {
          console.error("Error parsing referer URL:", e)
        }
      }
    }

    if (!isAllowedDomain && process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "This domain is not authorized to embed this chatbot" }, { status: 403 })
    }

    const responseData = {
      ...configData,
      name: configData?.name || userData?.chatbot_name || "Bot247",
      theme: formattedTheme,
    }

    return NextResponse.json(responseData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Error in chatbot-config API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  )
}
