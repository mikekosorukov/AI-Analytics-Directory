"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExploreTools from "@/components/ui/explore-tools";
import HowTo from "@/components/ui/how-to";
import About from "@/components/ui/about";
import Header from "@/components/ui/header";

export default function Tools() {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14] font-serif">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center font-serif">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[1.5] text-white drop-shadow-2xl">
            Explore emerging{" "}
            <span className="text-[#e67f43]">AI analytics</span> landscape
          </h1>
          <h1 className="text-white text-3xl md:text-4xl mb-16">
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
