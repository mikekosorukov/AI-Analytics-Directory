"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ToolDetails() {
  const params = useParams();
  const { id } = params;
  const [toolData, setToolData] = useState<any>(null);
  const [communities, setCommunities] = useState<
    { id: string; name: string; url: string }[]
  >([]);
  const [competitorsData, setCompetitorsData] = useState<
    { id: string; name: string; url: string }[]
  >([]); // New state for competitors
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
        // Fetch competitors from competitors table
        const { data: competitorData, error: competitorError } = await supabase
          .from("competitors")
          .select("id, name, url")
          .in("id", competitorIds);

        if (competitorError) {
          console.error("Error fetching competitors:", competitorError.message);
        } else {
          setCompetitorsData(competitorData || []);
        }
      }

      setLoading(false);
    };

    fetchToolAndCommunities();
  }, [id]);

  // Safe parse function for arrays
  const safeParse = (val: any) => {
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

  // Get logo URL from Simple Icons
  const getLogoUrl = (name: string) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${formattedName}.svg`;
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
  const uniqueFeatures = safeParse(toolData.unique_features);
  const vsStatusQuo = safeParse(toolData.vs_status_quo);

  return (
    <div className="space-y-6 bg-[#f5f5f5] p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src={
              toolData.logo_path || getLogoUrl(toolData.tool_name || "default")
            }
            alt={`${toolData.tool_name} logo`}
            width={32}
            height={32}
            className="w-8 h-8"
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
        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">What it is for?</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {whatFor.map((item: string, i: number) => (
                <li key={i} className="bg-slate-100 rounded-md p-2">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Who it is for */}
        <Card className="flex-1 min-w-[300px]">
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
        <Card className="flex-1 min-w-[300px]">
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
                      className="bg-slate-100 rounded-md p-2 text-sm border"
                    >
                      <summary className="cursor-pointer font-medium">
                        {title.trim() || "Alternative"}
                      </summary>
                      <p className="mt-2 text-gray-700">{desc}</p>
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
          <Card className="lg:w-[66%]">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Idea behind</h3>
              <hr />
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                {toolData.long_description}
              </p>
            </CardContent>
          </Card>

          <Card className="flex-1 lg:w-[30%]">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Direct competitors</h3>
              <hr />
              <ul className="space-y-3 text-sm text-gray-700 mt-3">
                {competitorsData.length > 0 ? (
                  competitorsData.map((c: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={getLogoUrl(c.name)}
                          alt={`${c.name} logo`}
                          width={24}
                          height={24}
                          className="border p-1 w-8 h-8 rounded-full bg-white"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/24?text=🌐";
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
        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Main capabilities</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-4">
              {mainCapabilities.map((cap: string, i: number) => (
                <li key={i} className="bg-slate-100 rounded-md p-2">
                  {cap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Unique features */}
        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Unique features</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {uniqueFeatures.map((feat: string, i: number) => (
                <li key={i} className="bg-slate-50 rounded-md p-2">
                  {feat}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Communities */}
        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Communities</h3>
            <hr />
            <ul className="space-y-3 text-sm text-gray-700 mt-3">
              {communities.map((c: any, i: number) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={getLogoUrl(c.name)}
                      alt={`${c.name} logo`}
                      width={24}
                      height={24}
                      className="border p-1 w-8 h-8 rounded-full bg-white"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/24?text=🌐";
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
