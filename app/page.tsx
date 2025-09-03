"use client";

import { useState } from "react";
import { Search, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SuggestedTools from "@/components/ui/suggest-tool";
import ExploreTools from "@/components/ui/explore-tools";
import HowTo from "@/components/ui/how-to";
import About from "@/components/ui/about";

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
  // ... rest of the tools array remains unchanged
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14] font-serif">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#111827]/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-[#e67f43]" />
              <span className="text-xl font-bold text-white drop-shadow-lg">
                AIAnalyticsLayer
              </span>
            </div>
            <Button
              onClick={() => setShowSuggest(!showSuggest)}
              className="bg-[#e67f43] hover:bg-[#b15b2a] text-white border-none shadow-md font-medium"
            >
              Suggest tool
            </Button>
            {showSuggest && (
              <div className="absolute top-20 right-4 w-[90%] md:w-[70%] lg:right-0 lg:left-[400px] xl:left-[550px] 2xl:left-[670px]">
                <SuggestedTools />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center font-serif">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            Explore emerging{" "}
            <span className="text-[#e67f43]"> AI analytics </span> landscape
          </h1>
          <h1 className="text-2xl md:text-5xl font-medium text-gray-200 mb-12 drop-shadow-lg">
            Find the{" "}
            <span className="text-[#e67f43] font-bold">right tool</span> for the
            job
          </h1>

          {/* Navigation Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-md mx-auto font-serif"
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
          <TabsContent value="explore">
            <ExploreTools />
          </TabsContent>
          <TabsContent value="howto">
            <HowTo />
          </TabsContent>
          <TabsContent value="about">
            <About />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
