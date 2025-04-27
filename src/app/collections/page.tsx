"use client";

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const CollectionsComponentPage = () => {
  const [graphics, setGraphics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Only fetch graphics when session is ready and authenticated
    if (status === 'authenticated' && session?.user?.id) {
      fetchGraphics(session.user.id);
    } else if (status === 'unauthenticated') {
      // User is definitely not logged in
      setIsLoading(false);
    }
    // We don't set loading to false for 'loading' status
  }, [session, status]);

  const handleDelete = async (graphicId: string) => {
    if (!confirm("Are you sure you want to delete this graphic?")) {
      return;
    }
    
    try {
      setIsDeleting(graphicId);
      
      const res = await fetch(`/api/graphics/${graphicId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Update the UI by filtering out the deleted graphic
        setGraphics(graphics.filter(g => g._id !== graphicId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete graphic");
      }
    } catch (err) {
      console.error("Error deleting graphic:", err);
      alert("An error occurred while deleting the graphic");
    } finally {
      setIsDeleting(null);
    }
  };
  
  const fetchGraphics = async (userId: string) => {
    setIsLoading(true);
    
    try {
      const res = await fetch(`/api/graphics?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        // Ensure graphics is always an array, even if API returns null
        const graphicsArray = Array.isArray(data.graphics) ? data.graphics : [];
        setGraphics(graphicsArray);
      } else {
        console.error("API error:", data.error || "Unknown error");
        // Set graphics to empty array for "No graphics yet" state
        setGraphics([]);
      }
    } catch (err) {
      console.error("Error fetching graphics:", err);
      // For exceptions, also just show the empty state
      setGraphics([]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const scrollAmount = direction === 'left' 
      ? -container.clientWidth / 2
      : container.clientWidth / 2;
    
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    // Update scroll position for arrow visibility
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  // Calculate if arrows should be visible
  const showLeftArrow = scrollPosition > 10;
  const showRightArrow = carouselRef.current 
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : true;

  // Handle create new graphic
  const handleCreateNew = () => {
    router.push("/graphic");
  };

  // Handle download function
  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);
      
      // Create a link element
      const link = document.createElement('a');
      
      // Set link properties
      link.href = blobUrl;
      link.download = filename;
      
      // Append to the document
      document.body.appendChild(link);
      
      // Trigger click
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/20 text-white p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Your Collections</h1>
          <div className="w-32 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="animate-pulse w-full">
          <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex-shrink-0 group">
                <div className="relative w-64 h-96 rounded-lg overflow-hidden bg-gray-800"></div>
                <div className="mt-3 h-4 w-20 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="h-8 w-64 bg-gray-800 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/20 text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Your Collections</h1>
        <button 
          onClick={handleCreateNew}
          className="cursor-pointer flex items-center px-4 py-2 bg-[#2cfbcd] text-black font-semibold rounded-lg hover:bg-opacity-80 transition-all"
          style={{ touchAction: 'manipulation' }}
        >
          <Plus size={18} className="mr-2" />
          Create New
        </button>
      </div>

      {graphics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-700 rounded-xl">
          <div className="bg-[#2cfbcd] bg-opacity-10 p-6 rounded-full mb-4">
            <Plus size={48} className="text-[#2cfbcd]" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No graphics yet</h2>
          <p className="text-gray-400 mb-6">Create your first sports quote graphic</p>
          <button 
            onClick={handleCreateNew}
            className="px-6 py-3 bg-[#2cfbcd] text-black font-semibold rounded-lg hover:bg-opacity-80 transition-all"
            style={{ touchAction: 'manipulation' }}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="relative min-h-[400px]">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button 
              onClick={() => scrollCarousel('left')}
              className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-[#2cfbcd] hover:text-black transition-all"
              aria-label="Scroll left"
              style={{ touchAction: 'manipulation' }}
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {/* Carousel */}
          <div 
            ref={carouselRef} 
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide"
            onScroll={handleScroll}
          >
           {graphics.map((graphic, index) => (
              <div 
                key={graphic._id || index} 
                className="flex-shrink-0 group"
              >
                <div className="relative w-64 h-96 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#2cfbcd] transition-all duration-300">
                  <img 
                    src={graphic.imageUrl} 
                    alt={`Graphic ${index}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDownload(graphic.imageUrl, `sportify-graphic-${index}.jpg`)}
                        className="cursor-pointer flex-1 p-3 bg-[#2cfbcd] rounded text-black text-xs font-semibold"
                        disabled={isDeleting === graphic._id}
                        style={{ touchAction: 'manipulation' }}
                      >
                        Download
                      </button>
                      <button 
                        onClick={() => handleDelete(graphic._id)}
                        className="cursor-pointer p-3 bg-[#2cfbcd] rounded text-black text-xs font-semibold"
                        disabled={isDeleting === graphic._id}
                        style={{ touchAction: 'manipulation' }}
                      >
                        {isDeleting === graphic._id ? "..." : <Trash2 size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#2cfbcd]">
                  {new Date(graphic.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          {showRightArrow && (
            <button 
              onClick={() => scrollCarousel('right')}
              className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-[#2cfbcd] hover:text-black transition-all"
              aria-label="Scroll right"
              style={{ touchAction: 'manipulation' }}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-white">
          Do More With Your <span className="text-[#2cfbcd]">Graphics</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[#2cfbcd] transition-all">
            <h3 className="text-[#2cfbcd] font-semibold mb-3">Share</h3>
            <p className="text-gray-300">Post directly to social media and engage your audience with powerful sports moments.</p>
          </div>
          
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[#2cfbcd] transition-all">
            <h3 className="text-[#2cfbcd] font-semibold mb-3">Download</h3>
            <p className="text-gray-300">Get high-resolution files for printing posters, creating merchandise, or offline use.</p>
          </div>
          
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[#2cfbcd] transition-all">
            <h3 className="text-[#2cfbcd] font-semibold mb-3">Create</h3>
            <p className="text-gray-300">Build your collection with new quotes and backgrounds to always have content ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsComponentPage;