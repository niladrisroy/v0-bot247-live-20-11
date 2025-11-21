import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables")
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const chatbotId = params.id

    if (!chatbotId) {
      return new Response(JSON.stringify({ error: "Chatbot ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log(`Fetching chatbot data for chatbot ID: ${chatbotId}`)

    const { data: chatbotData, error: chatbotError } = await supabase
      .from("credentials")
      .select("*")
      .eq("chatbot_id", chatbotId)
      .single()

    if (chatbotError) {
      console.error("Error fetching chatbot data:", chatbotError)
      return new Response(JSON.stringify({ error: "Failed to fetch chatbot data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { data: themeData, error: themeError } = await supabase
      .from("chatbot_themes")
      .select("*")
      .eq("chatbot_id", chatbotId)
      .maybeSingle()

    if (themeError) {
      console.error("Error fetching theme data:", themeError)
    }

    return new Response(
      JSON.stringify({
        ...chatbotData,
        theme: themeData || null,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error in chatbot-data API route:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
