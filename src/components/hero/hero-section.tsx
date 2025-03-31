"use client";

import InfiniteScroll from "./infinite-scroll";
import HeroText from "./hero-text";
import HeroStats from "./hero-stats";

interface HeroProps {
  images1: string[];
  images2: string[];
  heading: string;
  subheading: string;
}

export default function HeroSection({
  images1,
  images2,
  heading,
  subheading,
}: HeroProps) {
  return (
    <div className="mx-auto background-test h-[800px] flex flex-col relative ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center flex-grow">
        {/* Left Column - Text Section */}
        <div className="text-center">
            <div className="diagonal-div1 drop-shadow-test"></div>
            <div className="diagonal-div2 drop-shadow-test"></div>
            <div className="diagonal-div3 drop-shadow-test"></div>
          <HeroText heading={heading} subheading={subheading} />
        </div>

        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
          <InfiniteScroll images={images1} />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
          <InfiniteScroll images={images2} reverse /> {/* Reverse direction */}
        </div>
      </div>

      {/* HeroStats taking the remaining space */}
      <div className="w-full flex justify-center items-center flex-grow">
        <HeroStats />
      </div>
    </div>
  );
}