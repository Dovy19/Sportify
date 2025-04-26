"use client";

import Link from 'next/link';
import { Github, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#161616] border-t border-gray-800 pt-12 pb-6 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link href="/" className="font-bold text-2xl text-white">
                Sport<span className="text-[#2cfbcd]">ify</span>
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              Create stunning sports graphics for social media in seconds.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>
          
          {/* Links - First Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/graphic" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Create a Graphic
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Your Collection
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Links - Second Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#2cfbcd] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Join our newsletter for tips, templates and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-[#161616] border border-gray-700 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-[#2cfbcd] text-white"
              />
              <button className="bg-[#2cfbcd] rounded-r-lg px-3 py-2 text-black hover:bg-opacity-80 transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section with Legal Links */}
        <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Sportify. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-[#2cfbcd] text-sm mb-2 md:mb-0 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-[#2cfbcd] text-sm mb-2 md:mb-0 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-[#2cfbcd] text-sm mb-2 md:mb-0 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;