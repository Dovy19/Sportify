"use client";

import Link from "next/link";
import LoginButton from "./login-button";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Colored top accent bar */}
      <div className="h-1 bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300"></div>
      
      <nav className="sportify-navbar-bg shadow-lg flex items-center justify-between p-4 text-white">
        {/* Logo section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-teal-300 h-10 w-10 rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-900" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
          </div>
          <span className="text-3xl font-bold text-white group-hover:text-teal-300 transition duration-300">
            Sportify
          </span>
        </Link>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/graphic" 
            className="text-xl font-medium hover:text-teal-300 transition relative group pb-1"
          >
            Create a Graphic
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/collections" 
            className="text-xl font-medium hover:text-teal-300 transition relative group pb-1"
          >
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        {/* Login button */}
        <div className="hidden md:flex">
          <LoginButton />
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
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
        <div className="md:hidden bg-gray-800 text-white p-4 absolute w-full z-10 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/graphic" 
              className="text-xl font-medium hover:text-teal-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Create a Graphic
            </Link>
            <Link 
              href="/collections" 
              className="text-xl font-medium hover:text-teal-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              href="/upload" 
              className="text-xl font-medium hover:text-teal-300 transition flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path>
                <polyline points="7 11 12 16 17 11"></polyline>
                <line x1="12" y1="4" x2="12" y2="16"></line>
              </svg>
              Upload Photo
            </Link>
            <div className="pt-2 border-t border-gray-700">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
      {/* <div className="h-1 bg-gradient-to-r from-teal-300 via-teal-400 to-teal-300"></div> */}
    </div>
  );
}