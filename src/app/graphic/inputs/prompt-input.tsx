"use client"


import { Label } from "@/components/ui/label"

interface promptProps {
    changePrompt: (type: string) => void
}

export default function PromptInput({changePrompt}: promptProps ) {


    return (
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
            <Label className="flex flex-col min-w-40 flex-1" htmlFor="prompt">
            <textarea
            id="prompt" 
            placeholder="Image Prompt (For Generating AI Pictures Only)"
            onChange={(e) => changePrompt(e.target.value)}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-1 focus:ring-[#2cfbcd] border border-[#2A2A2A] bg-[#1A1A1A] focus:border-[#2cfbcd] min-h-32 placeholder:text-[#6B6B6B] p-[15px] text-base font-normal leading-normal"
              />
            </Label>
        </div>
    )
}