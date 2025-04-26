import HeroText from "./hero-text";
import HeroStats from "./hero-stats";
import InfiniteScroll from "./infinite-scroll";

interface HeroSectionProps {
  images1: string[];
  images2: string[];
  heading: string;
  subheading: string;
}

export default function HeroSection({ images1, images2, heading, subheading }: HeroSectionProps) {
  return (
    <div className="w-full background-test min-h-[600px] md:min-h-[700px] lg:h-[800px] flex flex-col relative mt-8 md:mt-12 lg:mt-[6rem] px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center flex-grow">
        {/* Text Section - Always first on mobile and desktop */}
        <div className="text-center md:text-left">
          <div className="hidden md:block">
            <div className="diagonal-div1 drop-shadow-test"></div>
            <div className="diagonal-div2 drop-shadow-test"></div>
            <div className="diagonal-div3 drop-shadow-test"></div>
          </div>
          <HeroText heading={heading} subheading={subheading} />
        </div>

        {/* Infinite Scroll Images - Desktop Only */}
        <div className="relative overflow-hidden w-full hidden md:block">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
          <InfiniteScroll images={images1} />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-black opacity-100"></div>
          <InfiniteScroll images={images2} reverse /> {/* Reverse direction */}
        </div>
        
        {/* Mobile - Static Image Grid (below text but above stats) */}
        <div className="md:hidden flex flex-wrap justify-center mt-4">
          <div className="text-center mb-6">
            <p className="text-white text-sm mb-2 font-medium italic">Featured Sports Moments:</p>
            <div className="grid grid-cols-2 gap-3">
              {images1.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={`/images/${image}`}
                  alt={`sports-moment-${index}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HeroStats taking the remaining space */}
      <div className="w-full flex justify-center items-center flex-grow py-8 md:py-0">
        <HeroStats />
      </div>
    </div>
  );
}