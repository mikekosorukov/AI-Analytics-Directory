"use client";

import { useState } from "react";
import { Search, ExternalLink, Bot, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuggestedTools from "@/components/ui/suggest-tool";

const tools = [
  {
    id: 1,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "productivity",
    rating: 4.8,
    users: "10k+",
  },
  {
    id: 2,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "analytics",
    rating: 4.7,
    users: "5k+",
  },
  {
    id: 3,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "ai",
    rating: 4.9,
    users: "15k+",
  },
  {
    id: 4,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "productivity",
    rating: 4.6,
    users: "8k+",
  },
  {
    id: 5,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "analytics",
    rating: 4.8,
    users: "12k+",
  },
  {
    id: 6,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "ai",
    rating: 4.7,
    users: "7k+",
  },
  {
    id: 7,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "productivity",
    rating: 4.9,
    users: "20k+",
  },
  {
    id: 8,
    name: "SuperHuman",
    description:
      "SuperHuman is an email app used by busy professionals for inbox management.",
    tags: ["Data Analytics", "Visualization"],
    category: "analytics",
    rating: 4.5,
    users: "6k+",
  },
];

const filterCategories = [
  { id: "all", label: "All Tools" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "analytics", label: "Analytics" },
  { id: "productivity", label: "Productivity" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  const filteredTools = tools.filter((tool) => {
    const matchesFilter =
      selectedFilter === "all" || tool.category === selectedFilter;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#111827]/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#6366f1]" />
              <span className="text-xl font-bold text-white drop-shadow-lg">
                AnalyticsHub
              </span>
            </div>
            <Button
              onClick={() => setShowSuggest(!showSuggest)}
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none shadow-md"
            >
              Suggest tool
            </Button>
            {showSuggest && <SuggestedTools />}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            Explore emerging AI analytics landscape
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-gray-200 mb-12 drop-shadow-lg">
            Find the{" "}
            <span className="text-[#6366f1] font-bold">right tool</span> for the
            job
          </p>

          {/* Navigation Tabs with dark glow */}
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
          <TabsContent value="explore" className="space-y-8">
            {/* Filters Section */}
            <div className="bg-[#0f1116]/80 rounded-xl p-6 shadow-lg border border-white/10">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  {filterCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedFilter === category.id ? "default" : "outline"
                      }
                      onClick={() => setSelectedFilter(category.id)}
                      className={`transition-all duration-200 ${
                        selectedFilter === category.id
                          ? "bg-[#6366f1] hover:bg-[#4f46e5] text-white border-[#6366f1]"
                          : "hover:bg-[#111827]/60 border-white/20 text-gray-300 bg-[#111827]/60"
                      }`}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      {category.label}
                    </Button>
                  ))}
                </div>
                <div className="relative w-full lg:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[#111827]/60 border-white/20 text-white placeholder-gray-400 focus:border-[#6366f1] focus:ring-[#6366f1]/20"
                  />
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="group hover:shadow-2xl transition-all duration-300 bg-[#111827]/70 border border-white/10 hover:border-[#6366f1] hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-lg flex items-center justify-center shadow-md">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f1116]/50 text-gray-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>

                    <h3 className="font-bold text-lg text-white mb-2 drop-shadow-sm">
                      {tool.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                      {tool.description}
                    </p>

                    <div className="flex items-center mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-[#facc15] text-[#facc15]" />
                        <span className="text-sm font-medium text-gray-200">
                          {tool.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {tool.users} users
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-[#6366f1]/20 text-[#6366f1] hover:bg-[#6366f1]/30 transition-colors border-[#6366f1]/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTools.length === 0 && (
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

          {/* How To */}
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
                    2. Filter and Search
                  </h3>
                  <p>
                    Use our filtering system to narrow down tools based on
                    category and search for specific features.
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

          {/* About */}
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
                  organized tools by category and functionality to make your
                  selection process as smooth as possible.
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
