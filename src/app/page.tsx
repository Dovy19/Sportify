
import HeroSection from "@/components/hero/hero-section";

export default function Home() {
 
  const images1 = [
    "image-1.webp",
    "image-2.webp",
    "image-3.jpg",
    "image-4.jpg",
    "image-5.jpg",
    "image-6.jpg"
    
  ]

  const images2 = [
    "image-7.jpg",
    "image-8.webp",
    "image-9.webp",
    "image-10.jpg",
    "image-11.jpg",
    "image-12.jpg",
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <HeroSection
      images1={images1}
      images2={images2}
      heading="Sports Graphics"
      subheading="into shareable visuals —"
      />
    </main>
  );
}