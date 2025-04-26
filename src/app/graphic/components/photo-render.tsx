"use client";

import { memo } from 'react';
import domtoimage from 'dom-to-image-more';

interface ImageProps {
  activeImage?: string;
  quote: string;
  contextText: string;
  quoteFontSize: string;
  contextFontSize: string;
  textMarginTop: string;
  selectedPreset: string; 
  isImageLoading: boolean;
  setIsImageLoading: (type: boolean) => void;
  graphicRef: React.RefObject<HTMLDivElement>;
}

const PhotoRender = memo(
  ({
    activeImage,
    quote,
    contextText,
    quoteFontSize,
    contextFontSize,
    textMarginTop,
    selectedPreset,
    isImageLoading,
    setIsImageLoading,
    graphicRef
  }: ImageProps) => {

    // console.log("Selected preset:", selectedPreset); // Debugging line

    return (
      <div>
        <div ref={graphicRef} className="absolute inset-0 flex items-center justify-center border-none" style={{ width: '100%', height: '100%' }}>

          {/* Spinner while image loads */}
          {isImageLoading && (
            <div className="z-[10] absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-[#2cfbcd]" />
            </div>
          )}

          {/* Background Image */}
          {activeImage && (
            <img
              className={`w-full h-full object-cover z-[0] border-none ${
                isImageLoading ? 'hidden' : 'block'
              }`}
              src={activeImage}
              alt="graphic-photo"
              onLoad={() => setIsImageLoading(false)}
              style={{ backgroundColor: 'transparent' }}
            />
          )}

          {/* Overlay Preset */}
          {selectedPreset && selectedPreset !== 'none' && (
            <div
              className="absolute bottom-0 left-0 w-full object-cover border-none"
              style={{
                height: '30%',
                backgroundImage:`
                linear-gradient(to top, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.95)),
                 url(${selectedPreset})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
                opacity: 0.95, 
                pointerEvents: 'none', 
              }}
            />
          )}

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center border-none">
            {quote && (
              <p
                className="display-text-font text-white font-bold drop-shadow-lg text-shadow-test leading-[100%] border-none"
                style={{ marginTop: textMarginTop, fontSize: quoteFontSize, transform: 'translateZ(0)', backgroundColor: 'transparent' }}
              >
                <span className="border-none">,, ,,</span>
                <br />
                {quote}
              </p>
            )}
            {contextText && (
              <p
                className="display-text-font text-white font-bold text-2xl drop-shadow-lg text-shadow-test border-none"
                style={{ fontSize: contextFontSize, transform: 'translateZ(0)', backgroundColor: 'transparent' }}
              >
                {contextText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PhotoRender.displayName = 'PhotoRender';
export default PhotoRender;