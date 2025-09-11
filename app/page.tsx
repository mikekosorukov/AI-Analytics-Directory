"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Search, Bot, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SuggestedTools from "@/components/ui/suggest-tool";
import Link from "next/link";
import Header from "@/components/ui/header";

// Define types for Supabase data
interface Tool {
  tool_id: string;
  tool_name: string;
  category: string[]; // Array of UUIDs
  technicality_level: string;
  short_description: string;
  url: string;
  rls: boolean;
}

interface Category {
  category_id: string; // UUID as string
  category_name: string;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [technicalityLevels, setTechnicalityLevels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("explore");
  const [showSuggest, setShowSuggest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTechnicality, setSelectedTechnicality] =
    useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // Fetch tools
      const { data: toolsData, error: toolsError } = await supabase
        .from("tools_updated")
        .select("*")
        .eq("rls", true);

      if (toolsError) {
        console.error("Error fetching tools:", toolsError);
      } else {
        setTools(toolsData || []);
        setFilteredTools(toolsData || []);

        // Extract unique technicality levels
        const uniqueTechnicalityLevels = Array.from(
          new Set(toolsData?.map((tool: Tool) => tool.technicality_level) || [])
        ).filter((level) => level);
        setTechnicalityLevels(uniqueTechnicalityLevels);
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("category_id, category_name");

      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      } else {
        const categoryMap = categoriesData.reduce(
          (map: Record<string, string>, category: Category) => {
            map[category.category_id] = category.category_name;
            return map;
          },
          {}
        );
        setCategories(categoryMap);
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Filter tools based on category and technicality
  useEffect(() => {
    let filtered = tools;

    // Filter by category (using UUID)
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (tool) =>
          Array.isArray(tool.category) &&
          tool.category.includes(selectedCategory)
      );
    }

    // Filter by technicality
    if (selectedTechnicality !== "all") {
      filtered = filtered.filter(
        (tool) => tool.technicality_level === selectedTechnicality
      );
    }

    setFilteredTools(filtered);
  }, [selectedCategory, selectedTechnicality, tools]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4 leading-[1.5] text-white drop-shadow-2xl">
            Explore emerging{" "}
            <span className="text-[#e67f43]">AI analytics</span> landscape
          </h1>
          <h1 className="text-white text-xl md:text-4xl mb-16 font-semibold">
            Find the <span className="text-[#e67f43]">right tool</span> for the
            job
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-8">
            {/* Filter Section */}
            <div className="bg-[#0f1116]/80 rounded-xl p-6 shadow-lg border border-white/10">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category Filter */}
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-1/2 bg-[#111827] text-white border-white/20">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(categories).map(([id, name]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Technicality Filter */}
                <Select
                  value={selectedTechnicality}
                  onValueChange={setSelectedTechnicality}
                >
                  <SelectTrigger className="w-full sm:w-1/2 bg-[#111827] text-white border-white/20">
                    <SelectValue placeholder="Select Technicality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Technicality Levels</SelectItem>
                    {technicalityLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Reset Filters Button */}
                <Button
                  variant="outline"
                  className="bg-blue-950 text-white border-white/20"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedTechnicality("all");
                  }}
                >
                  Reset Filters
                </Button>
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
                {filteredTools.map((tool) => (
                  <div
                    key={tool.tool_id}
                    className="relative p-4 rounded-lg group hover:shadow-2xl transition-all duration-300 bg-[#111827]/70 border border-white/10 hover:border-[#6366f1] hover:-translate-y-1 hover:cursor-pointer"
                  >
                    <Link href={`/tools/${tool.tool_id}`} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative z-50 w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-lg flex items-center justify-center shadow-md">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="group"
                        >
                          {/* <Link
                            href={`${tool.url}`}
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f1116]/50 text-gray-300 group-hover:bg-gray-300 group-hover:text-black"
                          >
                            <ExternalLink className="h-4 w-4 hover:bg-gray-300 hover:text-black" />
                          </Link> */}
                        </Button>
                      </div>

                      <Link
                        href={`/tools/${tool.tool_id}`}
                        className="font-bold text-lg text-white mb-2 drop-shadow-sm"
                      >
                        {tool.tool_name}
                      </Link>
                      <Link
                        href={`/tools/${tool.tool_id}`}
                        className="text-gray-200 text-sm mb-4 line-clamp-3"
                      >
                        {tool.short_description}
                      </Link>

                      <Link
                        href={`/tools/${tool.tool_id}`}
                        className="flex flex-col items-start justify-center gap-3 text-white"
                      >
                        <div className="flex items-start gap-2">
                          <h1 className="font-semibold text-xs">Category</h1>
                          <div className="flex gap-2 flex-wrap">
                            {Array.isArray(tool.category) &&
                              tool.category.map((catId, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-500 p-1 px-2 rounded-lg border border-gray-300 text-[8px]"
                                >
                                  {categories[catId] || "Unknown Category"}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <h1 className="font-semibold text-xs">
                            Technicality
                          </h1>
                          <div className="w-40">
                            <div className="h-4 rounded-full bg-gray-300 overflow-hidden">
                              <div
                                className={`
                                  h-full transition-all duration-500
                                  ${
                                    tool.technicality_level?.toLowerCase() ===
                                    "low"
                                      ? "w-1/3 bg-green-600"
                                      : tool.technicality_level?.toLowerCase() ===
                                        "medium"
                                      ? "w-2/3 bg-gradient-to-r from-green-600 to-yellow-500"
                                      : tool.technicality_level?.toLowerCase() ===
                                        "high"
                                      ? "w-full bg-gradient-to-r from-green-600 via-yellow-500 to-orange-600"
                                      : "w-0"
                                  }
                                `}
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredTools.length === 0 && (
              <div className="text-center py-20">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No tools found
                </h3>
                <p className="text-gray-300">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
