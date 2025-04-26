"use client";

import { Users2, Megaphone, Newspaper, Heart, Trophy } from 'lucide-react';
import Link from 'next/link';

const WhoItsFor = () => {
  const audiences = [
    {
      id: 1,
      title: "Content Creators",
      description: "Produce professional sports content for YouTube, TikTok, and Instagram",
      icon: <Users2 className="w-8 h-8 text-[#2cfbcd]" />,
      bgImage: "/whofor/whofor-1.png", // Image of content creator with camera/phone
    },
    {
      id: 2,
      title: "Social Media Managers",
      description: "Create engaging posts for team accounts and sports brands",
      icon: <Megaphone className="w-8 h-8 text-[#2cfbcd]" />,
      bgImage: "/whofor/whofor-2.png", // Image of social media dashboard
    },
    {
      id: 3,
      title: "Sports Journalists",
      description: "Illustrate articles and reports with powerful visual quotes",
      icon: <Newspaper className="w-8 h-8 text-[#2cfbcd]" />,
      bgImage: "/whofor/whofor-3.png", // Image of journalist or sports news
    },
    {
      id: 4,
      title: "Fan Communities",
      description: "Share memorable moments with fellow fans in online groups",
      icon: <Heart className="w-8 h-8 text-[#2cfbcd]" />,
      bgImage: "/whofor/whofor-4.png", // Image of fans celebrating
    },
    {
      id: 5,
      title: "Sports Enthusiasts",
      description: "Collect and preserve your favorite sports moments and quotes",
      icon: <Trophy className="w-8 h-8 text-[#2cfbcd]" />,
      bgImage: "/whofor/whofor-5.png", // Image of person watching sports
    },
  ];

  return (
    <section className="py-16 bg-[#121212] w-full">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Who It's <span className="text-[#2cfbcd]">For</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sportify helps everyone create professional sports graphics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {audiences.map((audience) => (
            <div 
              key={audience.id} 
              className="group relative overflow-hidden rounded-xl h-64 md:h-80 w-full"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${audience.bgImage})`,
                }}
              ></div>
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-300 group-hover:translate-y-[-10px]">
                <div className="bg-black/60 p-3 rounded-lg inline-flex items-center mb-3 border-l-2 border-[#2cfbcd]">
                  {audience.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {audience.title}
                </h3>
                
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {audience.description}
                </p>
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2cfbcd] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
        <button className="cursor-pointer bg-transparent border-2 border-[#2cfbcd] text-[#2cfbcd] font-semibold px-8 py-3 rounded-lg hover:bg-[#2cfbcd] hover:text-black transition-all">
            <Link href="/graphic">
            Create Your First Graphic
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;