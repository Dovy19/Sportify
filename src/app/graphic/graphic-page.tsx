"use client"

import ContextInput from "./inputs/context-input"
import PromptInput from "./inputs/prompt-input"
import QuoteInput from "./inputs/quote-input"
import PhotoRender from "./components/photo-render"
import CreateButton from "./components/create-button"
import Presets from "./presets/presets"
import TextStyles from "./text-styles/text-styles"
import domtoimage from 'dom-to-image-more';
import { useSession } from "next-auth/react"
import { saveSchema } from "@/lib/validations"
import { toast } from "sonner"

import { useState, useRef } from "react"

export default function Graphic() {
    const [activeButton, setActiveButton] = useState("upload")
    const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
    const [quote, setQuote] = useState("")
    const [contextText, setContextText] = useState("")
    const [quoteFontSize, setQuoteFontSize] = useState("3rem")
    const [contextFontSize, setContextFontSize] = useState("1.5rem")
    const [textMarginTop, setTextMarginTop] = useState("5rem")
    const [selectedPreset, setSelectedPreset] = useState<string>("none");
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [prompt, setPrompt] = useState("")

    const changeQuote = (quote: string) => setQuote(quote)
    const changeContext = (context: string) => setContextText(context)
    const changePrompt = (prompt: string) => setPrompt(prompt)

    const changeQuoteFontSize = (quoteFontSize: string) => setQuoteFontSize(quoteFontSize)
    const changeContextFontSize = (size: string) => setContextFontSize(size)
    const changeTextMarginTop = (textMarginTop: string) => setTextMarginTop(textMarginTop)

    const {data: session} = useSession();

    const graphicRef = useRef<HTMLDivElement>(null);
    
    const handleCapture = async () => {
      if (!graphicRef.current || !session?.user?.id) return;
      try {
        const dataUrl = await domtoimage.toJpeg(graphicRef.current, {quality: 0.95});
        console.log("Capture image URL:", dataUrl);

        const result = saveSchema.safeParse({
          quote,
          context: contextText,
          activeImage,
        })

        if(!result.success) {
          toast.error(result.error.errors[0].message);
          return;
        }

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({dataUrl, userId: session.user.id}),
        });

        const {url} = await res.json();
        console.log("Uploaded image URL:", url);

        toast.success("Successfully Saved to Database! Click 'Collections' to view your graphics!");
      } catch (err) {
        console.error("Error capturing image:", err);
      }
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-[#121212] overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
          <div className="flex h-full grow flex-col">
            <div className="px-4 sm:px-6 md:px-10 flex flex-1 justify-center py-5">
              <div className="flex flex-col md:flex-row w-full max-w-[1200px]">
                {/* Left Side - Inputs */}
                <div className="flex flex-col w-full md:w-1/2 py-5 md:pr-6">
                  <h1 className="text-white tracking-light text-[28px] md:text-[32px] font-bold leading-tight px-0 md:px-4 text-left pb-3 pt-0 md:pt-6">Create a Graphic</h1>
                  
                  <div className="flex max-w-full flex-wrap items-end gap-4 px-0 md:px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1 w-full">
                      <QuoteInput changeQuote={changeQuote} />
                    </label>
                  </div>
                  
                  <div className="flex max-w-full flex-wrap items-end gap-4 px-0 md:px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1 w-full">
                      <ContextInput changeContext={changeContext} />
                    </label>
                  </div>
                  
                  <div className="flex max-w-full flex-wrap items-end gap-4 px-0 md:px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1 w-full">
                      <PromptInput changePrompt={changePrompt} />
                    </label>
                  </div>
                  
                  <div className="px-0 md:px-4">
                    <CreateButton setActiveImage={setActiveImage} prompt={prompt} setIsImageLoading={setIsImageLoading} onCapture={handleCapture} />
                  </div>
                </div>
                
                {/* Right Side - Preview and Presets */}
                <div className="flex flex-col w-full md:w-1/2 py-5 md:pl-6 mt-4 md:mt-0">
                  <div className="mt-0 md:mt-14 flex flex-col md:flex-row gap-4">
                    {/* Image Preview Area */}
                    <div className="bg-[#1A1A1A] rounded-xl overflow-hidden relative md:w-1/2 flex items-center justify-center border border-[#2A2A2A] aspect-[3/4] h-[400px] md:h-[600px] md:w-[500px]">
                      <PhotoRender 
                        activeImage={activeImage} 
                        quote={quote} 
                        contextText={contextText} 
                        quoteFontSize={quoteFontSize}
                        contextFontSize={contextFontSize}
                        textMarginTop={textMarginTop}
                        selectedPreset={selectedPreset}
                        isImageLoading={isImageLoading}
                        setIsImageLoading={setIsImageLoading}
                        graphicRef={graphicRef}
                      />
                    </div>
                    
                    {/* Presets to the right of the image */}
                    <div className="md:w-1/2 flex flex-col mt-4 md:mt-0">
                      {/* Preset Buttons */}
                      <div className="mb-4">
                        <h3 className="text-white font-semibold mb-2 md:hidden">Presets</h3>
                        <Presets selectedPreset={selectedPreset} setSelectedPreset={setSelectedPreset} />
                      </div>
                      
                      {/* Text Style Options */}
                      <div>
                        <h3 className="text-white font-semibold mb-2 md:hidden">Text Styles</h3>
                        <TextStyles changeQuoteFontSize={changeQuoteFontSize} changeContextFontSize={changeContextFontSize} changeTextMarginTop={changeTextMarginTop} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}