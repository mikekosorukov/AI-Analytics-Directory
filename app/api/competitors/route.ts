import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const idsParam = searchParams.get("ids");

  if (!idsParam) {
    return NextResponse.json({ error: "ids parameter is required" }, { status: 400 });
  }

  // Parse the comma-separated IDs
  const ids = idsParam.split(",").filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const { data, error } = await supabaseServer
    .from("tools_updated")
    .select("tool_id, tool_name, url, logo_path")
    .in("tool_id", ids);

  if (error) {
    console.error("Error fetching competitors:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

