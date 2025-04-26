"use client";

import Link from "next/link";
import LoginButton from "./login-button";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Thin accent line */}
      <div className="h-1 bg-[#2cfbcd]"></div>
      
      <nav className="bg-[#121212] flex items-center justify-between px-8 py-5 text-white">
        {/* Logo section */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight">
            Sport<span className="text-[#2cfbcd]">ify</span>
          </span>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            href="/graphic" 
            className="text-sm uppercase tracking-wide font-semibold text-gray-200 hover:text-[#2cfbcd] transition duration-200"
          >
            Create a Graphic
          </Link>
          <Link 
            href="/collections" 
            className="text-sm uppercase tracking-wide font-semibold text-gray-200 hover:text-[#2cfbcd] transition duration-200"
          >
            Collections
          </Link>
          <Link 
            href="/customize" 
            className="text-sm uppercase tracking-wide font-semibold text-gray-200 hover:text-[#2cfbcd] transition duration-200"
          >
            Customize
          </Link>
          <LoginButton />
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#161616] text-white absolute w-full z-10 border-t border-gray-800">
          <div className="flex flex-col divide-y divide-gray-800">
            <Link 
              href="/graphic" 
              className="px-8 py-4 text-sm font-medium hover:bg-black hover:text-[#2cfbcd] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Create a Graphic
            </Link>
            <Link 
              href="/collections" 
              className="px-8 py-4 text-sm font-medium hover:bg-black hover:text-[#2cfbcd] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/customize" 
              className="px-8 py-4 text-sm font-medium hover:bg-black hover:text-[#2cfbcd] transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Customize
            </Link>
            <div className="px-8 py-4">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}