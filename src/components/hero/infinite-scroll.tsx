"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface InfiniteScrollProps {
  images: string[];
  reverse?: boolean; // New prop to control direction
}

export default function InfiniteScroll({ images, reverse = false }: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const imageElements = container.querySelectorAll("img");
      let totalWidth = 0;

      // Calculate the total width of all images, including margins
      imageElements.forEach((img) => {
        const style = window.getComputedStyle(img);
        const marginRight = parseFloat(style.marginRight || "0");
        totalWidth += img.offsetWidth + marginRight;
      });

      // Since images are duplicated, we only scroll half the total width
      const scrollWidth = totalWidth / 2;

      controls.start({
        x: reverse ? [-scrollWidth, 0] : [0, -scrollWidth], // Reverse direction if needed
        transition: {
          duration: 40, // Adjust duration for smooth scrolling
          repeat: Infinity,
          ease: "linear",
        },
      });
    }
  }, [controls, reverse]);

  const allImages = [...images, ...images]; // Duplicate images for seamless scrolling

  return (
    <div className="relative overflow-hidden w-full m-4 infinite-scroll-container mt-6">
      <motion.div
        ref={containerRef}
        className="flex items-center justify-start"
        animate={controls}
      >
        {allImages.map((image, index) => (
          <img
            key={index}
            src={`/images/${image}`}
            alt={`hero-image-${index}`}
            className="w-36 h-auto mr-4" // Adjust size and margin for each image
          />
        ))}
      </motion.div>
    </div>
  );
}