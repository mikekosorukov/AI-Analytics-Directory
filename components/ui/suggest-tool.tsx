"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const suggestedTools = [
  {
    id: 1,
    name: "Notion",
    description: "An all-in-one workspace for notes, tasks, and collaboration.",
    icon: "https://cdn.worldvectorlogo.com/logos/notion-logo-1.svg",
    link: "https://www.notion.so/",
  },
  {
    id: 2,
    name: "Figma",
    description:
      "A collaborative design tool used for UI/UX design and prototyping.",
    icon: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
    link: "https://www.figma.com/",
  },
  {
    id: 3,
    name: "Slack",
    description:
      "A messaging platform for team communication and project coordination.",
    icon: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg",
    link: "https://slack.com/",
  },
  {
    id: 4,
    name: "Tableau",
    description:
      "A data visualization tool for business intelligence and analytics.",
    icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg",
    link: "https://www.tableau.com/",
  },
  {
    id: 5,
    name: "Jira",
    description:
      "A project management tool commonly used for agile software development.",
    icon: "https://cdn.worldvectorlogo.com/logos/jira-1.svg",
    link: "https://www.atlassian.com/software/jira",
  },
  {
    id: 6,
    name: "Trello",
    description: "A Kanban-based project management tool by Atlassian.",
    icon: "https://cdn.worldvectorlogo.com/logos/trello.svg",
    link: "https://trello.com/",
  },
  {
    id: 7,
    name: "Zoom",
    description: "A video conferencing platform for meetings and webinars.",
    icon: "https://cdn.worldvectorlogo.com/logos/zoom-communications-logo.svg",
    link: "https://zoom.us/",
  },
  {
    id: 8,
    name: "GitHub",
    description:
      "A development platform for hosting and collaborating on code.",
    icon: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg",
    link: "https://github.com/",
  },
  {
    id: 9,
    name: "VS Code",
    description: "A powerful, free code editor with extensions support.",
    icon: "https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg",
    link: "https://code.visualstudio.com/",
  },
  {
    id: 10,
    name: "Canva",
    description:
      "An online tool for creating graphics, presentations, and content.",
    icon: "https://cdn.worldvectorlogo.com/logos/canva-1.svg",
    link: "https://www.canva.com/",
  },
  {
    id: 11,
    name: "Airtable",
    description:
      "A low-code platform for building collaborative apps and databases.",
    icon: "https://cdn.worldvectorlogo.com/logos/airtable-1.svg",
    link: "https://airtable.com/",
  },
  {
    id: 12,
    name: "Zapier",
    description: "An automation tool that connects apps and workflows.",
    icon: "https://cdn.worldvectorlogo.com/logos/zapier.svg",
    link: "https://zapier.com/",
  },
  {
    id: 13,
    name: "Asana",
    description: "A project management tool to track work and goals.",
    icon: "https://cdn.worldvectorlogo.com/logos/asana-1.svg",
    link: "https://asana.com/",
  },
  {
    id: 14,
    name: "Dropbox",
    description: "A cloud storage service for files and team collaboration.",
    icon: "https://cdn.worldvectorlogo.com/logos/dropbox-2.svg",
    link: "https://dropbox.com/",
  },
  {
    id: 15,
    name: "Miro",
    description: "An online collaborative whiteboard platform for teams.",
    icon: "https://cdn.worldvectorlogo.com/logos/miro-2.svg",
    link: "https://miro.com/",
  },
];

export default function SuggestedTools() {
  return (
    <div className="absolute top-20 left-0 right-0 backdrop-blur-sm flex items-center justify-end z-50 px-4 2xl:right-80">
      <div className="w-full max-w-2xl bg-[#0f1116] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Suggested Tools</h2>
          <p className="text-gray-400 text-sm">
            Here are some recommended tools and what they’re used for:
          </p>
        </div>

        <div className="overflow-y-auto max-h-[70vh] divide-y divide-white/10 scrollbar-thin scrollbar-thumb-[#6366f1]/50 scrollbar-track-transparent">
          {suggestedTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="bg-[#111827]/70 border-none rounded-none shadow-none hover:bg-[#1c1f2a] transition-colors">
                <CardContent className="p-5 flex items-start gap-4">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={10}
                    height={10}
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {tool.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
