"use client";

import { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuggestedTools from "@/components/ui/suggest-tool";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function Header() {
  const [showSuggest, setShowSuggest] = useState(false);
  const suggestRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestRef.current &&
        !suggestRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSuggest(false);
      }
    }

    if (showSuggest) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggest]);

  return (
    <header className="border-b border-white/10 bg-[#111827]/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src={Logo} width="40" alt="logo" />
            <span className="text-white drop-shadow-lg">AI Analytics Hub</span>
          </div>

          {/* Suggest Tool Modal */}
          {showSuggest && (
            <div
              ref={suggestRef}
              className="absolute top-16 w-[90%] md:w-[70%] lg:w-[45%] xl:w-[35%] min-[1440px]:w-[32%] 2xl:w-[30%] lg:right-0 md:left-[200px] lg:left-[520px] xl:left-[800px] min-[1440px]:left-[880px] 2xl:left-[1050px]"
            >
              <SuggestedTools />
            </div>
          )}

          {/* Suggest Tool Button */}
          <Button
            ref={buttonRef}
            onClick={() => setShowSuggest((prev) => !prev)}
            className="bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none shadow-md"
          >
            Suggest tool
          </Button>
        </div>
      </div>
    </header>
  );
}
