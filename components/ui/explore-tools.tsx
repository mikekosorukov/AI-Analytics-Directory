"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define interfaces for better type safety
interface ToolData {
  tool_id: string;
  tool_name: string;
  url: string;
  logo_path?: string;
  communities?: any;
  competitors?: any;
  jobs?: any;
  personas?: any;
  capabilities?: any;
  unique_features?: any;
  vs_status_quo?: any;
  long_description?: string;
  // Add other fields as needed
}

interface Competitor {
  id: string;
  name: string;
  url: string;
  logo_path: string;
}

interface Community {
  id: string;
  name: string;
  url: string;
}

export default function ToolDetails() {
  const params = useParams();
  const { id } = params;
  const [toolData, setToolData] = useState<ToolData | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [competitorsData, setCompetitorsData] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tool details, communities, and competitors
  useEffect(() => {
    if (!id) return;

    const fetchToolAndCommunities = async () => {
      setLoading(true);

      // Fetch tool data
      const { data: tool, error: toolError } = await supabase
        .from("tools_updated")
        .select("*")
        .eq("tool_id", id)
        .eq("rls", true)
        .single();

      if (toolError) {
        console.error("Error fetching tool:", toolError.message);
        setLoading(false);
        return;
      }

      setToolData(tool);

      // Parse communities IDs
      const communityIds = safeParse(tool.communities);
      if (communityIds.length > 0) {
        // Fetch communities from communities table
        const { data: communityData, error: communityError } = await supabase
          .from("communities")
          .select("id, name, url")
          .in("id", communityIds);

        if (communityError) {
          console.error("Error fetching communities:", communityError.message);
        } else {
          setCommunities(communityData || []);
        }
      }

      // Parse competitors IDs and fetch from competitors table
      const competitorIds = safeParse(tool.competitors);
      if (competitorIds.length > 0) {
        // Fetch competitors from tools_updated table
        const { data: competitorData, error: competitorError } = await supabase
          .from("tools_updated")
          .select("tool_id, tool_name, url, logo_path")
          .in("tool_id", competitorIds);

        if (competitorError) {
          console.error("Error fetching competitors:", competitorError.message);
        } else {
          // Transform competitor data to match the expected type
          const formattedCompetitors: Competitor[] = (competitorData || []).map(
            (competitor: any) => ({
              id: competitor.tool_id,
              name: competitor.tool_name,
              url: competitor.url,
              logo_path: competitor.logo_path,
            })
          );
          setCompetitorsData(formattedCompetitors);
        }
      }

      setLoading(false);
    };

    fetchToolAndCommunities();
  }, [id]);

  // Safe parse function for arrays
  const safeParse = (val: any): string[] => {
    try {
      if (!val) return [];
      return Array.isArray(val) ? val : JSON.parse(val);
    } catch {
      return val
        .replace(/\[|\]/g, "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
  };

  const regexParse = (val: any): string[] => {
    try {
      if (!val) return [];
      return Array.isArray(val) ? val : JSON.parse(val);
    } catch {
      let cleaned = val.replace(/\r?\n/g, ",").replace(/"\s*"/g, '","');

      const regex = /"([^"]+)"|([^,]+)/g;
      const result: string[] = [];
      let match;

      while ((match = regex.exec(cleaned)) !== null) {
        const text = match[1] || match[2];
        if (text) result.push(text.trim());
      }

      return result.filter(Boolean);
    }
  };

  // Get logo URL from Simple Icons with fallbacks
  const getLogoUrl = (name: string) => {
    if (!name) return "/placeholder-ai-icon.svg"; // Local fallback if available

    // Clean name: lowercase, remove spaces, common words like "AI"
    let formattedName = name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/ai$/, "");

    // Try variations for better matches (e.g., "Julius AI" → "julius")
    const variations = [
      formattedName,
      name.toLowerCase().replace(/\s+/g, "-"), // e.g., "julius-ai"
      name.toLowerCase().replace(/\s+/g, ""), // e.g., "juliusai"
    ];

    // Try Simple Icons for each variation
    for (const variation of variations) {
      const url = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${variation}.svg`;
      // Note: In a real app, you could prefetch or check via API, but here we rely on onError
      // For now, assume first variation; onError will handle failures
      if (variation === formattedName) return url; // Default to first
    }

    // If no Simple Icons, return generic AI icon (free from Icons8 or similar)
    return "https://img.icons8.com/ios-filled/50/000000/robot.png"; // Generic robot/AI icon; replace with local if preferred
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-medium text-white mb-2">
          Loading tools...
        </h3>
      </div>
    );
  }

  if (!toolData) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-red-500">Tool not found.</h3>
      </div>
    );
  }

  // Parse other arrays
  const whatFor = safeParse(toolData.jobs);
  const whoFor = safeParse(toolData.personas);
  const mainCapabilities = safeParse(toolData.capabilities);
  const uniqueFeatures = regexParse(toolData.unique_features);
  const vsStatusQuo = safeParse(toolData.vs_status_quo);

  return (
    <div className="space-y-6 bg-[#f5f5f5] p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src={
               `https://fonkqzvixslrqlrbrjhi.supabase.co/storage/v1/object/public/public-assets/${toolData.logo_path}`
              //toolData.logo_path || getLogoUrl(toolData?.tool_name || "default")
            }
            alt={`${toolData.tool_name} logo`}
            width={32}
            height={32}
            className="w-8 h-8"
            onError={(e) => {
              e.currentTarget.src =
                "https://img.icons8.com/ios-filled/50/000000/robot.png"; // Better fallback: AI robot icon
            }}
          />
          <h2 className="text-2xl font-bold">{toolData.tool_name}</h2>
        </div>
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 w-32 h-9 border-black"
        >
          <a href={toolData.url} target="_blank" rel="noopener noreferrer">
            Website <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      {/* Flexbox Layout */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        {/* What it is for */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">What it is for?</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {whatFor.map((item: string, i: number) => (
                <li key={i} className="rounded-md p-2 bg-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Who it is for */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Who it is for?</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {whoFor.map((item: string, i: number) => (
                <li key={i} className="bg-slate-200 rounded-md p-2">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Vs status quo */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Vs status quo alternatives</h3>
            <hr />
            <div className="space-y-3 mt-3">
              {vsStatusQuo.length > 0 ? (
                vsStatusQuo.map((item: string, i: number) => {
                  const [title, ...description] = item.split(":");
                  const desc = description.join(":").trim();
                  return (
                    <details
                      key={i}
                      className="bg-slate-200 rounded-md p-2 text-sm border"
                    >
                      <summary className="cursor-pointer font-medium">
                        {title.trim() || "Alternative"}
                      </summary>
                      <p className="mt-2 text-gray-700 bg-slate-200">{desc}</p>
                    </details>
                  );
                })
              ) : (
                <p className="text-sm text-gray-700">
                  No status quo alternatives provided.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Idea + competitors row */}
        <div className="flex flex-col lg:flex-row gap-6 w-full bg-white">
          <Card className="lg:w-[66%] bg-white">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Idea behind</h3>
              <hr />
              <p className="text-sm text-gray-700 mt-3 leading-relaxed bg-slate-200 p-2 rounded-lg">
                {toolData.long_description}
              </p>
            </CardContent>
          </Card>

          <Card className="flex-1 lg:w-[30%] bg-white">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Direct competitors</h3>
              <hr />
              <ul className="space-y-3 text-sm text-gray-700 mt-3">
                {competitorsData.length > 0 ? (
                  competitorsData.map((c: Competitor, i: number) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-3 bg-slate-200 p-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={`https://fonkqzvixslrqlrbrjhi.supabase.co/storage/v1/object/public/public-assets/${c.logo_path}`}
                          alt={`${c.name} logo`}
                          width={24}
                          height={24}
                          className="border p-1 w-8 h-8 rounded-full bg-white"
                          onError={(e) => {
                            console.warn(
                              `Failed to load competitor logo for ${c.name}`
                            ); // Debug
                            e.currentTarget.src =
                              "https://img.icons8.com/ios-filled/50/000000/robot.png"; // Better fallback
                          }}
                        />
                        <span>{c.name}</span>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 border-black"
                      >
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-700">No competitors found.</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Main capabilities */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Main capabilities</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-4">
              {mainCapabilities.map((cap: string, i: number) => (
                <li key={i} className="bg-slate-200 rounded-md p-2">
                  {cap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Unique features */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Unique features</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {uniqueFeatures.map((feat: string, i: number) => (
                <li key={i} className="rounded-md p-2 bg-slate-200">
                  {feat}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Communities */}
        <Card className="flex-1 min-w-[300px] bg-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Communities</h3>
            <hr />
            <ul className="space-y-3 text-sm text-gray-700 mt-3">
              {communities.map((c: Community, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 bg-slate-200 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={getLogoUrl(c.name)}
                      alt={`${c.name} logo`}
                      width={24}
                      height={24}
                      className="border p-1 w-8 h-8 rounded-full bg-white"
                      onError={(e) => {
                        console.warn(
                          `Failed to load community logo for ${c.name}`
                        ); // Debug
                        e.currentTarget.src =
                          "https://img.icons8.com/ios-filled/50/000000/robot.png"; // Better fallback
                      }}
                    />
                    <span>{c.name}</span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 border-black"
                  >
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
