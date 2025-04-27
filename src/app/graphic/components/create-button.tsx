import InputFile from "../inputs/file-input"
import { generateImage } from "@/lib/generate-image"
import { useState } from "react"
import { promptSchema } from "@/lib/validations"
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface ImageProps {
    setActiveImage:(type: string) => void,
    prompt: string,
    setIsImageLoading: (type: boolean) => void,
    onCapture: () => void
  }

export default function CreateButton({setActiveImage, prompt, setIsImageLoading, onCapture} : ImageProps) {

  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    const result = promptSchema.safeParse({ prompt });
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      if (errors.prompt) {
        setError(errors.prompt[0]);
      }
      return;
    }
    setIsImageLoading(true);
    setIsLoading(true);
    const imageUrl = await generateImage(prompt);
    if (imageUrl) {
       setActiveImage(imageUrl);
        setIsLoading(false);
      }
    setError(null);
  }


  const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="flex flex-col px-4 py-3 gap-3">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="relative pr-10 mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              
              <button
                onClick={() => setError(null)}
                className="absolute right-2 top-2 text-red-500 hover:text-red-700 cursor-pointer"
              >
                ✕
              </button>
            </Alert>
          )}
            <div className="flex gap-4">
                {/* Create button */}
              <button 
                onClick={onCapture} 
                className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#2cfbcd] text-black hover:bg-[#20dbb1] active:bg-[#1dc0a0] transition-colors text-sm font-bold leading-normal tracking-[0.015em]"
                style={{ touchAction: 'manipulation' }}
              >
                <span className="truncate">Save to Collections</span>
              </button>

                {/* Upload Image button */}
                <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors text-sm font-bold leading-normal tracking-[0.015em]">
                    <InputFile setActiveImage={setActiveImage} />
                </button>
                </div>

                {/* GENERATE WITH AI BUTTON */}
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-[#696565] disabled:text-white flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 border border-[#2A2A2A] bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] transition-colors text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <div className="text-[#2cfbcd] mr-2" data-icon="MagicWand" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,208H168V192a8,8,0,0,0-16,0v16H136a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V224h16a8,8,0,0,0,0-16ZM219.31,80,68.69,230.63a16,16,0,0,1-22.63,0L36.69,221.25a16,16,0,0,1,0-22.62L187.31,48A16,16,0,0,1,210,48l9.38,9.38A16,16,0,0,1,219.31,80Zm-22.62,0L48,228.69,59.31,240,208,91.31Z"
                      ></path>
                    </svg>
                  </div>
                  <span className="truncate">{isLoading ? "Generating..." : "Generate with AI"}</span>
                </button>
            
        </div>
    )
}