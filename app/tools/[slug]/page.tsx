"use client";

import ExploreTools from "@/components/ui/explore-tools";
import Header from "@/components/ui/header";

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <ExploreTools />
      </main>
    </div>
  );
}