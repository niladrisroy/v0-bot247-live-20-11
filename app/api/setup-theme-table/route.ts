import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: tables, error: tablesError } = await supabase
      .from("pg_tables")
      .select("tablename")
      .eq("schemaname", "public")
      .eq("tablename", "chatbot_themes")

    if (tablesError) {
      console.error("Error checking for table:", tablesError)
      return NextResponse.json({ error: tablesError.message }, { status: 500 })
    }

    if (!tables || tables.length === 0) {
      return NextResponse.json(
        {
          error: "The chatbot_themes table does not exist. Please create it with the following SQL:",
          sql: `
          CREATE TABLE public.chatbot_themes (
            id SERIAL PRIMARY KEY,
            chatbot_id TEXT NOT NULL,
            primary_color TEXT NOT NULL,
            secondary_color TEXT NOT NULL,
            border_radius INTEGER NOT NULL,
            avatar_url TEXT,
            dark_mode BOOLEAN DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(chatbot_id)
          );
        `,
        },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, message: "Table exists" })
  } catch (error) {
    console.error("Error in setup-theme-table API route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
