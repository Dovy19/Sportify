

import { NextRequest } from "next/server";
import Graphic from "@/models/Graphic";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        await connectDB(); // Ensure you have a function to connect to your MongoDB
        // Parse userId from the query string
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), {
                status: 400,
            });
        }

        // Fetch user graphics from MongoDB, sorted by creation date
        const userGraphics = await Graphic.find({ userId }).sort({ createdAt: -1 });

        // Return the found graphics
        return new Response(JSON.stringify({ graphics: userGraphics }), {
            status: 200,
        });
    } catch (err) {
        console.error("Error fetching graphics:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch graphics" }), {
            status: 500,
        });
    }
}
