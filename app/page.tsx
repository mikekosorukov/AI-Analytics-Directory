"use client";

import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bot, ExternalLink, Loader2, Check, ChevronLeft, ChevronRight, Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Header from "@/components/ui/header";
import HowTo from "@/components/ui/how-to";
import About from "@/components/ui/about";
import Image from 'next/image';
import { useStore } from './store/store';
import { TABS } from './types/tabs';

const PAGE_SIZE = 8;

// Define types for Supabase data
interface Tool {
  tool_id: string;
  tool_name: string;
  category: string[]; // Array of UUIDs
  technicality_level: string;
  short_description: string;
  url: string;
  rls: boolean;
  logo_path: string;
}

interface Category {
  category_id: string;
  category_name: string;
}

interface TechnicalityLevel {
  technicality_level: string;
}

export default function Home() {
  const { activeTab, setActiveTab } = useStore()

  //data
  const [tools, setTools] = useState<Tool[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  //meta
  const [categories, setCategories] = useState<Record<string, string>>({});
  const [technicalityLevels, setTechnicalityLevels] = useState<string[]>([]);

  //ui state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTechnicality, setSelectedTechnicality] = useState<string>("all");

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const hasMore = total === null ? false : tools?.length < total;

  const containerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const updateScrollButtons = () => {
		if (!containerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
		setCanScrollLeft(scrollLeft > 0);
		setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
	};

	useLayoutEffect(() => {
		updateScrollButtons();
	}, [categories]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener('scroll', updateScrollButtons);
		window.addEventListener('resize', updateScrollButtons);

		return () => {
			container.removeEventListener('scroll', updateScrollButtons);
			window.removeEventListener('resize', updateScrollButtons);
		};
	}, [categories]);

	const scrollLeftFunc = () => {
		containerRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
	};
	const scrollRightFunc = () => {
		containerRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
	};

  const buildQuery = useCallback(() => {
    let query = supabase
      .from("tools_updated")
      .select(
        "tool_id, tool_name, category, technicality_level, short_description, url, rls, logo_path",
        { count: "exact" }
      )
      .eq("rls", true)
      .order("tool_name", { ascending: true });

    if (selectedCategory !== "all") {
      query = query.contains("category", [selectedCategory]);
    }
    if (selectedTechnicality !== "all") {
      query = query.eq("technicality_level", selectedTechnicality);
    }
    return query;
  }, [selectedCategory, selectedTechnicality]);

  const loadFirstPage = useCallback(async () => {
    setIsInitialLoading(true);
    setTools([]);
    setTotal(null);

    const from = 0;
    const to = PAGE_SIZE - 1;

    const { data, error, count } = await buildQuery().range(from, to);

    if (error) {
      console.error("Error fetching first page:", error);
      setIsInitialLoading(false);
      return;
    }

    setTools(data || []);
    setTotal(count ?? 0);
    setIsInitialLoading(false);
  }, [buildQuery]);

  const loadMore = async () => {
    if (isPageLoading) return;
    setIsPageLoading(true);

    const from = tools?.length;
    const to = tools?.length + PAGE_SIZE - 1;

    const { data, error } = await buildQuery().range(from, to);
    
    if (error) {
      console.error("Error fetching next page:", error);
      setIsPageLoading(false);
      return;
    }

    setTools((prev) => [...prev, ...(data || [])]);
    setIsPageLoading(false);
  }

    useEffect(() => {
    (async () => {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("category_id, category_name");
      if (categoriesError) {
        console.error("Error fetching categories:", categoriesError);
      } else {
        const map = (categoriesData || []).reduce(
          (acc: Record<string, string>, c: Category) => {
            acc[c.category_id] = c.category_name;
            return acc;
          },
          {}
        );
        setCategories(map);
      }

      const { data: technicalityData, error: technicalityError } = await supabase
        .from("technicality_level")
        .select("technicality_level");
      if (technicalityError) {
        console.error("Error fetching technicality levels:", technicalityError);
      } else {
        setTechnicalityLevels(
          (technicalityData || []).map((t: TechnicalityLevel) => t.technicality_level)
        );
      }
    })();
  }, []);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1116] via-[#111827] to-[#0b0d14]">
      {/* Header */}
      <Header />

      {/* Hero Section. Show only on main page */} 
			{activeTab === 'explore' ? (
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
			) : null}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab as TABS)}>
          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-8">
            {/* Filter Section */}
            <div className='relative bg-[#0f1116]/80 rounded-xl p-6 shadow-lg border border-white/10'>
							{/* Scrollable Container */}
							<div
								className='flex gap-4 overflow-x-hidden py-2 relative z-10 pr-40'
								ref={containerRef}
							>
								{Object.entries(categories).map(([id, name]) => (
									<div
										key={id}
										className={`flex items-center whitespace-nowrap gap-3 px-5 py-2.5 border border-[#474858] text-[#BFC5D7] bg-[#111827] rounded-xl transition-all duration-300 hover:border-[#6366f1] hover:-translate-y-1 hover:cursor-pointer ${
											selectedCategory === id ? '!text-white bg-[#6366F1]' : ''
										}`}
										onClick={() => setSelectedCategory(id)}
									>
										{name}
									</div>
								))}
							</div>
							{canScrollLeft && (
								<div className='absolute left-0 top-0 h-full flex items-center rounded-xl bg-gradient-to-r from-[#0f1116] via-[#0f1116]/95 to-[#0f1116]/0 pl-4 pr-20 z-20'>
									<button
										onClick={scrollLeftFunc}
										className='bg-[#0f1116]/90 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white/10 hover:bg-[#0f1116]/95 shrink-0'
									>
										<ChevronLeft className='w-7 h-7 text-white stroke-2' />
									</button>
								</div>
							)}
							<div className='absolute right-0 top-0 h-full flex items-center rounded-xl gap-4 pr-4 bg-gradient-to-l from-[#0f1116] via-[#0f1116]/95 to-[#0f1116]/0 pl-8 z-20'>
								{canScrollRight && (
									<button
										onClick={scrollRightFunc}
										className='bg-[#0f1116]/90 backdrop-blur-sm p-1 rounded-full shadow-sm border border-white/10 hover:bg-[#0f1116]/95 shrink-0'
									>
										<ChevronRight className='w-7 h-7 text-white stroke-2' />
									</button>
								)}
								<div className='flex items-center gap-4'>
									<div className='text-[#777D8F]'>
										{isInitialLoading
											? 'Loading...'
                      :
                      <div className='flex items-center gap-2'>
                        <Funnel className='w-5 h-5' />
                        <div className='flex'>
                          {tools?.length} results
                        </div>
                      </div>}
									</div>
									<button className='text-white hover:text-[#6366F1] transition' onClick={() => setSelectedCategory('all')}>
										Clear
									</button>
								</div>
							</div>
						</div>

            {/* Tools Grid */}
            {isInitialLoading ? (
              <div className="text-center py-20">
                <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-medium text-white mb-2">
                  Loading tools...
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tools.map((tool) => (
                  <div
                    key={tool.tool_id}
                    className="relative p-4 rounded-lg group hover:shadow-2xl transition-all duration-300 bg-[#111827]/70 border border-white/10 hover:border-[#6366f1] hover:-translate-y-1 hover:cursor-pointer"
                  >
                    <Link href={`/tools/${tool.tool_id}`} className="px-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                         {tool.logo_path ? (
														<Image
															fill
															className='object-cover rounded-lg'
															src={`https://fonkqzvixslrqlrbrjhi.supabase.co/storage/v1/object/public/public-assets/${tool.logo_path}`}
															alt={tool.tool_name}
														/>
													) : (
														<Bot className='h-6 w-6 text-white' />
													)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            href={`${tool.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#0f1116]/50 text-gray-300 group-hover:bg-gray-300 group-hover:text-black"
                          >
                            <ExternalLink className="h-4 w-4 hover:bg-gray-300 hover:text-black" />
                          </Link>
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
                        <div className="flex items-center gap-2">
                          <h1 className="font-semibold text-xs">Category</h1>
                          <div className="flex gap-2 flex-wrap">
                            {Array.isArray(tool.category) &&
                              tool.category.map((catId, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-500 p-1 px-2 rounded-lg border border-gray-300 text-xs"
                                >
                                  {categories[catId] || "Unknown Category"}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/*<div className="flex items-center gap-2">
                          <h1 className="font-semibold text-xs">
                            Technicality
                          </h1>
                          <div className="w-32">
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
                        </div>*/}
                      </Link>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isPageLoading}
                  className="bg-[#6366f1] hover:bg-[#5458e6] text-white"
                >
                  {isPageLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Show more"
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* How To Tab */}
          <TabsContent value="howto" className="space-y-8">
            <HowTo />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <About />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}