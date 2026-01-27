import { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabaseServer";
import { client } from "@/sanity/lib/client";
import { postsSitemapQuery } from "@/sanity/lib/queries";

interface SitemapPost {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or fallback to default
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aidataanalytics.io").replace(/\/$/, "");

  // Fetch tools and blog posts in parallel
  const [toolsResult, posts] = await Promise.all([
    supabaseServer
      .from("tools_updated")
      .select("slug")
      .eq("rls", true),
    client.fetch<SitemapPost[]>(postsSitemapQuery),
  ]);

  const { data: tools, error: toolsError } = toolsResult;

  if (toolsError) {
    console.error("Error fetching tools for sitemap:", toolsError);
  }

  console.log("Tools fetched for sitemap:", tools?.length || 0);
  console.log("Blog posts fetched for sitemap:", posts?.length || 0);

  // Generate tool URLs
  const toolUrls =
    tools?.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) ?? [];

  // Generate blog post URLs
  const blogPostUrls =
    posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt || post.publishedAt || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...toolUrls,
    ...blogPostUrls,
  ];
}
