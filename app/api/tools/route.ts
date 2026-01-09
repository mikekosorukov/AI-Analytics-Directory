import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const from = parseInt(searchParams.get("from") || "0");
  const to = parseInt(searchParams.get("to") || "7");
  const category = searchParams.get("category");
  const technicality = searchParams.get("technicality");

  let query = supabaseServer
    .from("tools_updated")
    .select(
      "tool_id, tool_name, category, technicality_level, short_description, url, rls, logo_path, slug",
      { count: "exact" }
    )
    .eq("rls", true)
    .order("tool_name", { ascending: true });

  if (category && category !== "all") {
    query = query.contains("category", [category]);
  }
  if (technicality && technicality !== "all") {
    query = query.eq("technicality_level", technicality);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}

