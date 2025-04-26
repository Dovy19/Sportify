"use client";

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

const CollectionsComponentPage = () => {
  const [graphics, setGraphics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { data: session } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // Fetch graphics when session is available
    if (session?.user?.id) {
      fetchGraphics(session.user.id);
    } else {
      // Set not loading if no session yet
      setIsLoading(false);
    }
  }, [session]);

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
    setError(null);
    
    try {
      const res = await fetch(`/api/graphics?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        // Ensure graphics is always an array, even if API returns null
        const graphicsArray = Array.isArray(data.graphics) ? data.graphics : [];
        setGraphics(graphicsArray);
        setError(null);
      } else {
        // console.error("API error:", data);
        // Don't show API errors to the user in the UI
        // Just set graphics to empty array to show the "No graphics yet" state
        setGraphics([]);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching graphics:", err);
      // For exceptions, also just show the empty state
      setGraphics([]);
      setError(null);
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

  // If still loading, let loading.tsx handle it
  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black/20 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Collections</h1>
        <button 
          onClick={handleCreateNew}
          className="cursor-pointer flex items-center px-4 py-2 bg-[rgb(44,251,205)] text-black font-semibold rounded-lg hover:bg-opacity-80 transition-all"
        >
          <Plus size={18} className="mr-2" />
          Create New
        </button>
      </div>

      {graphics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-700 rounded-xl">
          <div className="bg-[rgb(44,251,205)] bg-opacity-10 p-6 rounded-full mb-4">
            <Plus size={48} className="text-[rgb(44,251,205)]" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No graphics yet</h2>
          <p className="text-gray-400 mb-6">Create your first sports quote graphic</p>
          <button 
            onClick={handleCreateNew}
            className="cursor-pointer px-6 py-3 bg-[rgb(44,251,205)] text-black font-semibold rounded-lg hover:bg-opacity-80 transition-all"
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button 
              onClick={() => scrollCarousel('left')}
              className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-[rgb(44,251,205)] hover:text-black transition-all"
              aria-label="Scroll left"
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
                <div className="relative w-64 h-96 rounded-lg overflow-hidden border-2 border-transparent hover:border-[rgb(44,251,205)] transition-all duration-300">
                  <img 
                    src={graphic.imageUrl} 
                    alt={`Graphic ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDownload(graphic.imageUrl, `sportify-graphic-${index}.jpg`)}
                        className="cursor-pointer flex-1 p-2 bg-[rgb(44,251,205)] rounded text-black text-xs font-semibold"
                        disabled={isDeleting === graphic._id}
                      >
                        Download
                      </button>
                      <button 
                        onClick={() => handleDelete(graphic._id)}
                        className="cursor-pointer p-2 bg-[#2cfbcd] rounded text-white text-xs font-semibold"
                        disabled={isDeleting === graphic._id}
                      >
                        {isDeleting === graphic._id ? "..." : <Trash2 color="black" size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[rgb(44,251,205)]">
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
              className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black bg-opacity-70 p-2 rounded-full hover:bg-[rgb(44,251,205)] hover:text-black transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Do More With Your <span className="text-[rgb(44,251,205)]">Graphics</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[rgb(44,251,205)] transition-all">
            <h3 className="text-[rgb(44,251,205)] font-semibold mb-3">Share</h3>
            <p className="text-gray-300">Post directly to social media and engage your audience with powerful sports moments.</p>
          </div>
          
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[rgb(44,251,205)] transition-all">
            <h3 className="text-[rgb(44,251,205)] font-semibold mb-3">Download</h3>
            <p className="text-gray-300">Get high-resolution files for printing posters, creating merchandise, or offline use.</p>
          </div>
          
          <div className="bg-[#161616] p-6 rounded-lg border border-[#2e2e2e] hover:border-[rgb(44,251,205)] transition-all">
            <h3 className="text-[rgb(44,251,205)] font-semibold mb-3">Create</h3>
            <p className="text-gray-300">Build your collection with new quotes and backgrounds to always have content ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsComponentPage;