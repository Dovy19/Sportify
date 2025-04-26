"use client"

import { useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import debounce from "lodash/debounce"

interface quoteProps {
    changeQuote: (type: string) => void,
}

export default function QuoteInput({changeQuote}: quoteProps) {
    const [localQuote, setLocalQuote] = useState("");
    
    // Create a debounced version of changeQuote
    const debouncedChangeQuote = useCallback(
        debounce((value: string) => {
            changeQuote(value);
        }, 50),
        [changeQuote]
    );
    
    const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setLocalQuote(value); // Update local state immediately
        debouncedChangeQuote(value); // Debounce the parent state update
    };

    return (
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
            <Label className="flex flex-col min-w-40 flex-1" htmlFor="quote">
            <textarea
                id="quote"
                value={localQuote} 
                placeholder="Quote"
                onChange={handleQuoteChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-1 focus:ring-[#2cfbcd] border border-[#2A2A2A] bg-[#1A1A1A] focus:border-[#2cfbcd] min-h-20 placeholder:text-[#6B6B6B] p-[15px] text-base font-normal leading-normal"
             />
             </Label>
        </div>
    )
}