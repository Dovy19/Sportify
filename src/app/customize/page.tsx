import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CustomizePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-16">
      <div className="max-w-2xl text-center px-4">
        <div className="inline-flex items-center justify-center bg-[#2cfbcd] bg-opacity-10 p-4 rounded-full mb-6">
          <Sparkles size={36} className="text-[#161616]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Advanced Customization <span className="text-[#2cfbcd]">Coming Soon</span>
        </h1>
        
        <div className="bg-[#161616] border border-gray-800 p-6 md:p-8 rounded-xl mb-8">
          <p className="text-gray-300 text-lg mb-4">
            We're working on powerful new tools to help you create truly unique sports graphics with:
          </p>
          
          <ul className="text-left text-gray-400 space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-[#2cfbcd] mr-2">•</span>
              <span>Custom overlay patterns and textures</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2cfbcd] mr-2">•</span>
              <span>Advanced text positioning and styling</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2cfbcd] mr-2">•</span>
              <span>Team color palettes and branded templates</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#2cfbcd] mr-2">•</span>
              <span>Animated effect options for social media</span>
            </li>
          </ul>
          
          <p className="text-gray-300">
            Check back soon for these exciting new features!
          </p>
        </div>
        
        <Link 
          href="/graphic"
          className="inline-flex items-center bg-[#2cfbcd] text-black font-semibold px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
        >
          Try Current Features
        </Link>
      </div>
    </div>
  );
}