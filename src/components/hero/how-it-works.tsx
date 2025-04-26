"use client";

import { ArrowRight, Upload, Type, Palette, Share2 } from 'lucide-react';
import Image from 'next/image';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Choose or Generate",
      description: "Upload your own sports image or use our AI to generate one",
      icon: <Upload className="w-8 h-8 text-[#2cfbcd]" />,
      imageSrc: "/steps/step-1.png", // Screenshot of upload/AI generation interface
    },
    {
      id: 2,
      title: "Add Your Quote",
      description: "Enter the quote and speaker to showcase memorable moments",
      icon: <Type className="w-8 h-8 text-[#2cfbcd]" />,
      imageSrc: "/steps/step-2.png", // Screenshot of quote input area
    },
    {
      id: 3,
      title: "Customize",
      description: "Position text, adjust colors, and add effects to match your style",
      icon: <Palette className="w-8 h-8 text-[#2cfbcd]" />,
      imageSrc: "/steps/step-3.png", // Screenshot of customization options
    },
    {
      id: 4,
      title: "Share or Download",
      description: "Instantly share to social media or download your creation",
      icon: <Share2 className="w-8 h-8 text-[#2cfbcd]" />,
      imageSrc: "/steps/step-4.png", // Screenshot of share/download buttons
    },
  ];

  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It <span className="text-[#2cfbcd]">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create stunning sports graphics in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step card */}
              <div className="bg-[#161616] rounded-xl p-6 h-full border border-gray-800 hover:border-[#2cfbcd] transition-all group">
                {/* Step number */}
                <div className="bg-[#2cfbcd] bg-opacity-10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <span className=" font-bold text-lg">{step.id}</span>
                </div>
                
                {/* Icon and title */}
                <div className="flex items-center mb-3">
                  <div className="mr-3">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 mb-6">{step.description}</p>
                
                {/* Image container */}
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-800 transition-all">
                  <Image 
                    src={step.imageSrc} 
                    alt={`Step ${step.id}: ${step.title}`}
                    fill
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-40"></div>
                </div>
              </div>
              
              {/* Connecting arrow (hide on last item and on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-[#2cfbcd]" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        {/* <div className="text-center mt-12">
          <button className="bg-[#2cfbcd] text-black font-semibold px-8 py-3 rounded-lg hover:bg-opacity-80 transition-all">
            Try It Now
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;