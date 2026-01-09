import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const { data: tool, error: toolError } = await supabaseServer
    .from("tools_updated")
    .select("*")
    .eq("slug", slug)
    .eq("rls", true)
    .single();

  if (toolError) {
    console.error("Error fetching tool:", toolError.message);
    return NextResponse.json({ error: toolError.message }, { status: 500 });
  }

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  return NextResponse.json({ data: tool });
}

