"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ToolDetails() {
  // Local mock data (later replace with API fetch or DB query)
  const tool = {
    name: "Notion",
    website: "https://www.notion.so",
    logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg",
    whatFor: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    whoFor: ["Startups", "Freelancers", "Enterprises"],
    alternatives: [
      {
        title: "Traditional analytics tools",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        title: "Another approach",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ],
    idea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    mainCapabilities: [
      "Task management",
      "Database and tables",
      "Real-time collaboration",
    ],
    uniqueFeatures: [
      "Blocks system",
      "All-in-one workspace",
      "Custom databases",
    ],
    competitors: [
      { name: "Coda", link: "https://coda.io" },
      { name: "Evernote", link: "https://evernote.com" },
    ],
    communities: [
      { name: "Reddit", icon: "📌", link: "https://reddit.com/r/Notion" },
      { name: "Discord", icon: "💬", link: "https://discord.gg/notion" },
    ],
  };

  // Helper to build logo url
  const getLogoUrl = (name: string) =>
    `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${name
      .toLowerCase()
      .replace(/\s+/g, "")}.svg`;

  return (
    <div className="space-y-6 bg-[#f5f5f5] p-6 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={tool.logoUrl}
            alt={`${tool.name} logo`}
            className="w-8 h-8"
          />
          <h2 className="text-2xl font-bold">{tool.name}</h2>
        </div>
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 w-32 h-9 border-black"
        >
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            Website <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      {/* Flexbox Layout */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">What it is for?</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {tool.whatFor.map((item, i) => (
                <li key={i} className="bg-slate-100 rounded-md p-2">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Who it is for?</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {tool.whoFor.map((item, i) => (
                <li key={i} className="bg-slate-200 rounded-md p-2">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Vs status quo alternatives</h3>
            <hr />
            <div className="space-y-3 mt-3">
              {tool.alternatives.map((alt, i) => (
                <details
                  key={i}
                  className="bg-slate-100 rounded-md p-2 text-sm border"
                >
                  <summary className="cursor-pointer font-medium">
                    {alt.title}
                  </summary>
                  <p className="mt-2 text-gray-700">{alt.desc}</p>
                </details>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <Card className="lg:w-[66%]">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Idea behind</h3>
              <hr />
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                {tool.idea}
              </p>
            </CardContent>
          </Card>

          <Card className="flex-1 lg:w-[30%]">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Direct competitors</h3>
              <hr />
              <ul className="space-y-3 text-sm text-gray-700 mt-3">
                {tool.competitors.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={getLogoUrl(c.name)}
                        alt={`${c.name} logo`}
                        width={14}
                        height={14}
                        className="border p-1 w-6 h-6 rounded-md bg-white"
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
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Main capabilities</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-4">
              {tool.mainCapabilities.map((cap, i) => (
                <li key={i} className="bg-slate-100 rounded-md p-2">
                  {cap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Unique features</h3>
            <hr />
            <ul className="space-y-2 text-sm text-gray-700 mt-3">
              {tool.uniqueFeatures.map((feat, i) => (
                <li key={i} className="bg-slate-50 rounded-md p-2">
                  {feat}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex-1 min-w-[300px]">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Communities</h3>
            <hr />
            <ul className="space-y-3 text-sm text-gray-700 mt-3">
              {tool.communities.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex justify-center items-center border p-1 w-8 h-8 rounded-full">{c.icon}</span>
                    <span>{c.name}</span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 border-black"
                  >
                    <a href={c.link} target="_blank" rel="noopener noreferrer">
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
