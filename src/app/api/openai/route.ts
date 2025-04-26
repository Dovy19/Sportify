import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.OPENAI_API_KEY;


const generateImageFromOpenAI = async (prompt: string) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                model: "dall-e-3",
                prompt,
                n: 1, 
                size: "1024x1024"
            },
            { headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' } }
        );
        return response.data.data[0].url;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image from OpenAI API");
    }
}

export async function POST(request: Request) {

    const { prompt } = await request.json();
    try {
        const image_url = await generateImageFromOpenAI(prompt);

        return NextResponse.json({image_url})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate image"}, {status: 500});
    }
}