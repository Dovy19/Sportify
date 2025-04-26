import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageProps {
  setActiveImage: (type: string) => void;
}

export default function InputFile({ setActiveImage }: ImageProps) {
  return (
    <Label 
      htmlFor="picture" 
      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors text-sm font-bold leading-normal tracking-[0.015em]"
    >
      <div className="text-white mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M220,152v56a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V152a12,12,0,0,1,24,0v44H196V152a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,0,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,0,0,17,17Z"></path>
        </svg>
      </div>
      <span className="truncate">Upload Image</span>

      {/* Hidden File Input */}
      <Input 
        id="picture" 
        type="file" 
        className="hidden" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setActiveImage(URL.createObjectURL(file));
          }
        }}
      />
    </Label>
  );
}
