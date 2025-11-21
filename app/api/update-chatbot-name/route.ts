import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { chatbotId, chatbotName } = await request.json()

    if (!chatbotId || !chatbotName) {
      return NextResponse.json({ error: "Missing required fields: chatbotId and chatbotName" }, { status: 400 })
    }

    const { error: credentialsError } = await supabase
      .from("credentials")
      .update({ chatbot_name: chatbotName })
      .eq("chatbot_id", chatbotId)

    if (credentialsError) {
      console.error("Error updating credentials:", credentialsError)
      return NextResponse.json({ error: "Failed to update chatbot name in credentials" }, { status: 500 })
    }

    const { data: themeData, error: themeCheckError } = await supabase
      .from("chatbot_themes")
      .select("*")
      .eq("chatbot_id", chatbotId)
      .maybeSingle()

    if (themeCheckError) {
      console.error("Error checking theme record:", themeCheckError)
    }

    if (themeData) {
      const { error: themeUpdateError } = await supabase
        .from("chatbot_themes")
        .update({ chatbot_name: chatbotName, updated_at: new Date().toISOString() })
        .eq("chatbot_id", chatbotId)

      if (themeUpdateError) {
        console.error("Error updating theme:", themeUpdateError)
      }
    } else {
      const { error: themeInsertError } = await supabase.from("chatbot_themes").insert({
        chatbot_id: chatbotId,
        chatbot_name: chatbotName,
        primary_color: "#3B82F6",
        secondary_color: "#10B981",
        border_radius: 8,
        dark_mode: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (themeInsertError) {
        console.error("Error inserting theme:", themeInsertError)
      }
    }

    return NextResponse.json({ success: true, message: "Chatbot name updated successfully" })
  } catch (error) {
    console.error("Error in update-chatbot-name route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
