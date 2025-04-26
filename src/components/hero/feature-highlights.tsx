"use client";

import { Sparkles, Zap, Palette, Share, Save, Image } from 'lucide-react';
import Link from 'next/link';

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      title: "AI-Powered Generation",
      description: "Create custom backgrounds with our advanced AI technology",
      icon: <Sparkles className="w-10 h-10 text-[#2cfbcd]" />,
    },
    {
      id: 2,
      title: "One-Click Styles",
      description: "Apply professional designs with a single click",
      icon: <Zap className="w-10 h-10 text-[#2cfbcd]" />,
    },
    {
      id: 3,
      title: "Premium Templates",
      description: "Choose from dozens of pre-designed layouts",
      icon: <Palette className="w-10 h-10 text-[#2cfbcd]" />,
    },
    {
      id: 4,
      title: "Instant Sharing",
      description: "Post directly to social media platforms",
      icon: <Share className="w-10 h-10 text-[#2cfbcd]" />,
    },
    {
      id: 5,
      title: "Personal Collection",
      description: "Save and organize your creations",
      icon: <Save className="w-10 h-10 text-[#2cfbcd]" />,
    },
    {
      id: 6,
      title: "High-Quality Exports",
      description: "Download graphics in premium resolution",
      icon: <Image className="w-10 h-10 text-[#2cfbcd]" />,
    },
  ];

  return (
    <section className="py-16 bg-[#161616]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why <span className="text-[#2cfbcd]">Sportify</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful features that make creating sports graphics quick and easy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-[#121212] rounded-xl p-8 border border-gray-800 hover:border-[#2cfbcd] transition-all group"
            >
              <div className="mb-6 bg-[#121212] bg-opacity-10 p-4 rounded-lg inline-block">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#2cfbcd] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400">
                {feature.description}
              </p>
              
              <div className="mt-6 w-12 h-1 bg-[#2cfbcd] rounded opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className=" cursor-pointer bg-transparent border-2 border-[#2cfbcd] text-[#2cfbcd] font-semibold px-8 py-3 rounded-lg hover:bg-[#2cfbcd] hover:text-black transition-all">
            <Link href="/graphic">
            Explore All Features
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;