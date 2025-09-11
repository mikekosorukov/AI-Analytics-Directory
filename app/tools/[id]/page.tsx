"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExploreTools from "@/components/ui/explore-tools";
import HowTo from "@/components/ui/how-to";
import About from "@/components/ui/about";
import Header from "@/components/ui/header";

export default function Tools() {
  const [activeTab, setActiveTab] = useState(""); // No default tab highlighted on load
  const router = useRouter();

  const handleTabChange = (value) => {
    if (value !== "explore") {
      setActiveTab(value); // Switch to "howto" or "about"
    }
    // "explore" is handled by onClick on the trigger
  };

  const handleExploreClick = () => {
    console.log("Explore Tools clicked, navigating to homepage...");
    router.push("/"); // Always navigate to homepage
  };

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

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-md mx-auto"
        >
          <TabsList className="grid w-full lg:h-16 grid-cols-3 lg:px-2 bg-[#111827]/80 border border-white/10 shadow-inner shadow-[#000]/50 rounded-lg backdrop-blur-sm">
            <TabsTrigger
              value="explore"
              onClick={handleExploreClick}
              className="lg:h-11 text-gray-300 hover:text-white transition-colors shadow-sm"
              // No data-[state=active] styles since it won't be active
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
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Default to ExploreTools on load when no tab is active */}
        {activeTab === "" && <ExploreTools />}
        
        {/* Tab-based content for other tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsContent value="howto">
            <HowTo />
          </TabsContent>
          <TabsContent value="about">
            <About />
          </TabsContent>
          {/* No TabsContent for "explore" since it's handled separately */}
        </Tabs>
      </main>
    </div>
  );
}