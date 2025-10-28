"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExploreTools from "@/components/ui/explore-tools";
import HowTo from "@/components/ui/how-to";
import About from "@/components/ui/about";
import Header from "@/components/ui/header";
import { Check } from 'lucide-react';
import { useStore } from '@/app/store/store';
import { TABS } from '@/app/types/tabs';

export default function Tools() {
  const { activeTab, setActiveTab } = useStore();
  const router = useRouter();

  const handleTabChange = (value: string) => {
    setActiveTab(value as TABS); // Update active tab for all tabs, including "explore"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className='relative py-20 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-4xl mx-auto text-center'>
						<h1 className='text-2xl md:text-4xl font-semibold mb-4 leading-[1.5] text-white drop-shadow-2xl'>
							Explore emerging{' '}
							<span className='bg-[#E67F44] py-1 px-2 text-shadow-xl'>
								AI analytics
							</span> {' '}
							landscape
						</h1>
						<h1 className='text-white text-xl md:text-4xl mb-16 font-semibold'>
							Find the{' '}
							<span className='bg-[#E67F44] py-1 px-2 text-shadow-xl'>
								right tool
							</span>{' '}
							for the job
						</h1>
					</div>

					{/* Badges */}
					<div className='flex justify-center items-center gap-6'>
						{[
							'Founder-curated. No scrape.',
							'70+ hand-selected tools',
							'Bi-weekly updates',
						].map((text) => (
							<>
								<div className='flex items-center gap-3 px-2.5 py-2 border border-[#474858] rounded-[36px]' key={text}>
									<div className='w-6 h-6 flex items-center justify-center bg-[#C5F4C7] rounded-full'>
										<Check className='w-4 h-4 stroke-[4px]' />
									</div>
									<div className='text-[#BFC5D7] text-[15px]'>{text}</div>
								</div>
							</>
						))}
					</div>
				</section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Render content based on active tab */}
        <Tabs value={activeTab} onValueChange={handleTabChange}>
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