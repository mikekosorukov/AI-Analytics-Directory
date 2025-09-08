"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Search, Bot, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuggestedTools from "@/components/ui/suggest-tool";
import Link from "next/link";
import Header from "@/components/ui/header";

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     async function fetchTools() {
  //       console.log("Fetching tools from Supabase...");
  //       setIsLoading(true);
  //       const { data, error } = await supabase.from("tools").select("*");
  //       if (error) {
  //         console.error("Error fetching tools:", error);
  //       } else {
  //         console.log("Tools fetched successfully:", data);
  //         setTools(data || []);
  //       }
  //       setIsLoading(false);
  //     }
  //     fetchTools();
  //   }, []);

  useEffect(() => {
    async function fetchTools() {
      console.log("Fetching tools from Supabase...");
      setIsLoading(true);
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .not("category", "is", null);
      if (error) {
        console.error("Error fetching tools:", error);
      } else {
        console.log("Tools fetched successfully:", data);
        setTools(data || []);
      }
      setIsLoading(false);
    }
    fetchTools();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-semibold mb-4 leading-[1.5] text-white drop-shadow-2xl">
            Explore emerging{" "}
            <span className="text-[#e67f43]">AI analytics</span> landscape
          </h1>
          <h1 className="text-white text-3xl md:text-4xl mb-16 font-semibold">
            Find the <span className="text-[#e67f43]">right tool</span> for the
            job
          </h1>

          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md mx-auto"
          >
            <TabsList className="grid w-full lg:h-16 grid-cols-3 lg:px-2 bg-[#111827]/80 border border-white/10 shadow-inner shadow-[#000]/50 rounded-lg backdrop-blur-sm">
              <TabsTrigger
                value="explore"
                className="data-[state=active]:bg-[#6366f1] lg:h-11 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors shadow-sm"
              >
                Explore Tools
              </TabsTrigger>
              <TabsTrigger
                value="howto"
                className="data-[state=active]:bg-[#6366f1] lg:h-11 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors shadow-sm"
              >
                How to
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-[#6366f1] lg:h-11 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors shadow-sm"
              >
                About
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-8">
            {/* Search Section */}
            <div className="bg-[#0f1116]/80 rounded-xl p-6 shadow-lg border border-white/10">
              <div className="relative w-full lg:w-80 mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#111827]/60 border-white/20 text-white placeholder-gray-400 focus:border-[#6366f1] focus:ring-[#6366f1]/20"
                />
              </div>
            </div>

            {/* Tools Grid */}
            {isLoading ? (
              <div className="text-center py-20">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-medium text-white mb-2">
                  Loading tools...
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <Card
                    key={tool.tool_id}
                    className="group hover:shadow-2xl transition-all duration-300 bg-[#111827]/70 border border-white/10 hover:border-[#6366f1] hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-lg flex items-center justify-center shadow-md">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            href={`/tools/${tool.tool_id}`}
                            key={tool.tool_id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f1116]/50 text-gray-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      <h1 className="font-bold text-lg text-white mb-2 drop-shadow-sm">
                        {tool.tool_name}
                      </h1>
                      <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                        {tool.short_description}
                      </p>

                      <div className="flex flex-col items-start gap-3 text-white justify-between">
                        <div className="flex items-center gap-2">
                          <h1 className="font-semibold text-sm lg:text-[16px]">
                            Category
                          </h1>
                          <p className="bg-gray-500 p-1 px-2 rounded-lg border-gray-300 text-sm">
                            {tool.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <h1 className="font-semibold text-sm lg:text-[16px]">
                            Techicality
                          </h1>
                          <div className="w-40">
                            {/* Progress Bar Container */}
                            <div className="h-4 rounded-full bg-gray-300 overflow-hidden">
                              <div
                                className={`
        h-full transition-all duration-500
        ${
          tool.technicality_level === "low"
            ? "w-1/3 bg-green-600"
            : tool.technicality_level === "medium"
            ? "w-2/3 bg-gradient-to-r from-green-600 to-yellow-500"
            : tool.technicality_level === "high"
            ? "w-full bg-gradient-to-r from-green-600 via-yellow-500 to-orange-600"
            : "w-0"
        }
      `}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && tools.length === 0 && (
              <div className="text-center py-20">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No tools found
                </h3>
                <p className="text-gray-300">
                  Try adjusting your search query.
                </p>
              </div>
            )}
          </TabsContent>

          {/* How To Tab */}
          <TabsContent value="howto" className="space-y-8">
            <div className="bg-[#0f1116]/80 rounded-xl p-8 shadow-lg border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-sm">
                How to Use AI Analytics Tools
              </h2>
              <div className="space-y-6 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold text-[#6366f1] mb-3">
                    1. Identify Your Needs
                  </h3>
                  <p>
                    Start by clearly defining what type of analytics you need
                    for your business or project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#6366f1] mb-3">
                    2. Search for Tools
                  </h3>
                  <p>
                    Use our search system to find tools with specific features.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#6366f1] mb-3">
                    3. Compare Options
                  </h3>
                  <p>
                    Review tool descriptions, ratings, and user counts to make
                    informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <div className="bg-[#0f1116]/80 rounded-xl p-8 shadow-lg border border-white/10 text-gray-300">
              <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-sm">
                About AI Analytics Landscape
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>
                  The AI analytics landscape is rapidly evolving, with new tools
                  and platforms emerging constantly. Our curated collection
                  helps you discover the most effective solutions for your
                  specific needs.
                </p>
                <p>
                  From data visualization to predictive modeling, we have
                  organized tools to make your selection process as smooth as
                  possible.
                </p>
                <p>
                  Each tool is rated and reviewed by our community to ensure you
                  have the most accurate and up-to-date information when making
                  your decision.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
