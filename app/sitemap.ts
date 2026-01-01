import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your tool URLs (only published tools with rls: true)
  const { data: tools, error } = await supabase
    .from("tools_updated")
    .select("slug")
    .eq("rls", true);

  if (error) {
    console.error("Error fetching tools for sitemap:", error);
  }

  console.log("Tools fetched for sitemap:", tools?.length || 0);

  // Use environment variable or fallback to default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

  const dynamicUrls =
    tools?.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...dynamicUrls,
  ];
}

