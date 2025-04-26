import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextStylesProps {
  changeQuoteFontSize: (size: string) => void
  changeContextFontSize: (size: string) => void
  changeTextMarginTop: (margin: string) => void
}

export default function TextStyles({ changeQuoteFontSize, changeContextFontSize, changeTextMarginTop }: TextStylesProps) {
    return (
        <div>            
          <div>
            <h3 className="text-white text-lg font-semibold mb-2">Quote Text Size</h3>
            <Select onValueChange={changeQuoteFontSize}>
              <SelectTrigger className="w-[180px] text-white">
                <SelectValue placeholder="Quote Text Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Text Size</SelectLabel>
                  <SelectItem value="1.25rem">XL</SelectItem>
                  <SelectItem value="1.5rem">2XL</SelectItem>
                  <SelectItem value="1.875rem">3XL</SelectItem>
                  <SelectItem value="2.25rem">4XL</SelectItem>
                  <SelectItem value="3rem">5XL</SelectItem>
                  <SelectItem value="3.75rem">6XL</SelectItem>
                  <SelectItem value="4.5rem">7XL</SelectItem>
                  <SelectItem value="6rem">8XL</SelectItem>
                  <SelectItem value="8rem">9XL</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
                  
          <div className="mt-6">
            <h3 className="text-white text-lg font-semibold mb-2">Context Text Size</h3>
            <Select onValueChange={changeContextFontSize}>
              <SelectTrigger className="w-[180px] text-white">
                <SelectValue placeholder="Context Text Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Text Size</SelectLabel>
                  <SelectItem value="1.25rem">XL</SelectItem>
                  <SelectItem value="1.5rem">2XL</SelectItem>
                  <SelectItem value="1.875rem">3XL</SelectItem>
                  <SelectItem value="2.25rem">4XL</SelectItem>
                  <SelectItem value="3rem">5XL</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <div className="flex flex-col">
              <Label className="text-white text-lg font-semibold mb-2">
                Text Position
              </Label>
              <Input 
                type="range"
                min="1"
                max="30"
                className="w-full" 
                onChange={(e) => changeTextMarginTop(`${e.target.value}rem`)} 
              />
            </div>
          </div>
        </div>
    )
}