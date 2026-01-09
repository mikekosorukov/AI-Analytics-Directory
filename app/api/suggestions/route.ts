import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { tool_name, description, website_link } = body;

    // Validate required fields
    if (!tool_name || !description || !website_link) {
      return NextResponse.json(
        { error: "Missing required fields: tool_name, description, website_link" },
        { status: 400 }
      );
    }

    // Basic validation
    if (tool_name.length > 200) {
      return NextResponse.json(
        { error: "Tool name is too long" },
        { status: 400 }
      );
    }

    if (description.length > 2000) {
      return NextResponse.json(
        { error: "Description is too long" },
        { status: 400 }
      );
    }

    // Basic URL validation
    try {
      new URL(website_link);
    } catch {
      return NextResponse.json(
        { error: "Invalid website URL" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("Tool_suggestions")
      .insert({ tool_name, description, website_link });

    if (error) {
      console.error("Error inserting suggestion:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Error processing suggestion:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

