"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from '@/app/store/store';
import { Button } from "@/components/ui/button";
import SuggestedTools from "@/components/ui/suggest-tool";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname()
  const router = useRouter();
  const { clearFilters, triggerScrollReset } = useStore()
  const [showSuggest, setShowSuggest] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const suggestRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const LINK_CLASSNAMES = 'text-base transition-colors duration-200 font-medium';

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

  const handleHomeClick = () => {
    clearFilters();
    triggerScrollReset();
  }

  return (
		<header className='border-b border-white/10 bg-[#111827]/90 backdrop-blur-md sticky top-0 z-50 shadow-md'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link href={'/'} className='flex items-center space-x-2' onClick={handleHomeClick}>
						<Image src={Logo} width='40' alt='logo' className='shrink-0' />
						<span className='text-white drop-shadow-lg whitespace-nowrap text-sm sm:text-base'>AI Analytics Hub</span>
					</Link>

					{/* Desktop Navigation - Links */}
					<nav className='hidden lg:flex items-center gap-6'>
						<Link
							href='/'
							onClick={handleHomeClick}
							className={`${LINK_CLASSNAMES} ${
								isActive('/') ? 'text-[#6366F1] underline decoration-[#6366F1] underline-offset-4' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							Tool list
						</Link>
						<Link
							href='/guide'
							className={`${LINK_CLASSNAMES} ${
								isActive('/guide') ? 'text-[#6366F1] underline decoration-[#6366F1] underline-offset-4' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							How To Use
						</Link>
						<Link
							href='/about'
							className={`${LINK_CLASSNAMES} ${
								isActive('/about') ? 'text-[#6366F1] underline decoration-[#6366F1] underline-offset-4' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							About
						</Link>
					</nav>

					{/* Desktop - Suggest Tool Button */}
					<Button
						ref={buttonRef}
						onClick={() => setShowSuggest((prev) => !prev)}
						className='hidden lg:block bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none shadow-md'
					>
						Suggest tool
					</Button>

					{/* Mobile Hamburger Menu */}
					<button
						className='lg:hidden text-white p-2'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label='Toggle menu'
					>
						{mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
					</button>

					{/* Suggest Tool Modal */}
					{showSuggest && (
						<div
							ref={suggestRef}
							className='absolute top-16 w-[90%] md:w-[70%] lg:w-[45%] xl:w-[35%] min-[1440px]:w-[32%] 2xl:w-[30%] lg:right-0 md:left-[200px] lg:left-[520px] xl:left-[800px] min-[1440px]:left-[880px] 2xl:left-[1050px]'
						>
							<SuggestedTools setShowSuggest={setShowSuggest} />
						</div>
					)}
				</div>

				{/* Mobile Menu Dropdown */}
				{mobileMenuOpen && (
					<div className='lg:hidden border-t border-white/10 py-4 space-y-4'>
						<Link
							href='/'
							onClick={() => {
								handleHomeClick();
								setMobileMenuOpen(false);
							}}
							className={`block w-full text-left px-4 py-2 text-base font-medium transition-colors ${
								isActive('/') ? '!text-[#6366F1]' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							Tool list
						</Link>
						<Link
							href='/guide'
							onClick={() => {
								setMobileMenuOpen(false);
							}}
							className={`block w-full text-left px-4 py-2 text-base font-medium transition-colors ${
								isActive('/guide') ? '!text-[#6366F1]' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							How To Use
						</Link>
						<Link
							href='/about'
							onClick={() => {
								setMobileMenuOpen(false);
							}}
							className={`block w-full text-left px-4 py-2 text-base font-medium transition-colors ${
								isActive('/about') ? '!text-[#6366F1]' : 'text-white hover:text-[#6366F1]'
							}`}
						>
							About
						</Link>
						<div className='px-4'>
							<Button
								onClick={() => {
									setShowSuggest((prev) => !prev);
									setMobileMenuOpen(false);
								}}
								className='w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none shadow-md'
							>
								Suggest tool
							</Button>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
