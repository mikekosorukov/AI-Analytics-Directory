"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import XIcon from '@/assets/communities/x.svg';
import SlackIcon from '@/assets/communities/slack.svg';
import GitHubIcon from '@/assets/communities/github.svg';
import ProductHuntIcon from '@/assets/communities/producthunt.svg';
import SubstackIcon from '@/assets/communities/substack.svg';

interface Community {
  url: string;
  platform: string;
}

// Define interfaces for better type safety
interface ToolData {
	tool_id: string;
	tool_name: string;
	url: string;
	logo_path?: string;
	communities?: any;
	communities_urls: Community[];
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

const COMMUNITY_ICONS: Record<string, StaticImageData> = {
	X: XIcon,
	Slack: SlackIcon,
	GitHub: GitHubIcon,
	ProductHunt: ProductHuntIcon,
	Substack: SubstackIcon,
};

export default function ToolDetails() {
  const params = useParams();
  const { slug } = params;
  const [toolData, setToolData] = useState<ToolData | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [competitorsData, setCompetitorsData] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch tool details, communities, and competitors
  useEffect(() => {
    if (!slug) return;

    const fetchToolAndCommunities = async () => {
      setLoading(true);

      try {
        // Fetch tool data via API
        const toolResponse = await fetch(`/api/tools/${slug}`);
        if (!toolResponse.ok) {
          console.error("Error fetching tool");
          setLoading(false);
          return;
        }

        const { data: tool } = await toolResponse.json();
        if (!tool) {
          setLoading(false);
          return;
        }

        setToolData(tool);

        // Parse competitors IDs and fetch from API
        const competitorIds = safeParse(tool.competitors);
        if (competitorIds.length > 0) {
          try {
            const competitorResponse = await fetch(`/api/competitors?ids=${competitorIds.join(',')}`);
            if (competitorResponse.ok) {
              const { data: competitorData } = await competitorResponse.json();
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
          } catch (error) {
            console.error("Error fetching competitors:", error);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tool:", error);
        setLoading(false);
      }
    };

    fetchToolAndCommunities();
  }, [slug]);

  const regexParse = (val: any): string[] => {
    try {
      if (!val) return [];
      
      // If already an array, return it
      if (Array.isArray(val)) return val;
      
      // If it's a string, try to parse it
      if (typeof val === 'string') {
        // Try standard JSON parse first
        try {
          return JSON.parse(val);
        } catch {
          // If JSON parse fails, it might be PostgreSQL array format
          // Remove outer brackets and split by comma, but preserve quoted strings
          const cleaned = val.trim();
          if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
            const inner = cleaned.slice(1, -1);
            const items: string[] = [];
            let current = '';
            let inQuotes = false;
            let escapeNext = false;
            
            for (let i = 0; i < inner.length; i++) {
              const char = inner[i];
              
              if (escapeNext) {
                current += char;
                escapeNext = false;
                continue;
              }
              
              if (char === '\\') {
                escapeNext = true;
                continue;
              }
              
              if (char === '"') {
                inQuotes = !inQuotes;
                continue;
              }
              
              if (char === ',' && !inQuotes) {
                if (current.trim()) {
                  items.push(current.trim());
                }
                current = '';
                continue;
              }
              
              current += char;
            }
            
            if (current.trim()) {
              items.push(current.trim());
            }
            
            return items;
          }
        }
      }
      
      return [String(val)];
    } catch (e) {
      console.error('Error parsing value:', val, e);
      return [];
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
  const vsStatusQuo = regexParse(toolData.vs_status_quo);

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
            <h3 className="font-semibold mb-2">What it is for</h3>
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
            <h3 className="font-semibold mb-2">Who it is for</h3>
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
            <h3 className="font-semibold mb-2">Benefits vs Status Quo</h3>
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
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <Card className="lg:w-[66%] bg-white">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Summary</h3>
              <hr />
              <p className="text-sm text-gray-700 mt-3 leading-relaxed bg-slate-200 p-2 rounded-lg">
                {toolData.long_description}
              </p>
            </CardContent>
          </Card>

          <Card className="flex-1 lg:w-[30%] bg-white">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Closest competitors</h3>
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
            <h3 className="font-semibold mb-2">Core capabilities and features</h3>
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
            <h3 className="font-semibold mb-2">Focus</h3>
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
            <h3 className="font-semibold mb-2">Active Communities</h3>
            <hr />
            <ul className="space-y-3 text-sm text-gray-700 mt-3">
              {toolData?.communities_urls?.map((c: Community, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 bg-slate-200 p-2 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={COMMUNITY_ICONS[c.platform]}
                      alt={`${c.platform} logo`}
                      width={24}
                      height={24}
                      className="border p-1 w-8 h-8 rounded-full bg-white"
                      onError={(e) => {
                        console.warn(
                          `Failed to load community logo for ${c.platform}`
                        ); // Debug
                        e.currentTarget.src =
                          "https://img.icons8.com/ios-filled/50/000000/robot.png"; // Better fallback
                      }}
                    />
                    <span>{c.platform}</span>
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
