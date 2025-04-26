// api/route.ts
import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Graphic from "@/models/Graphic";

export async function POST(req: NextRequest) {
  console.log("API route called");
  
  try {
    console.log("Parsing request body");
    const { dataUrl, userId } = await req.json();
    console.log("User ID:", userId);
    console.log("Data URL length:", dataUrl?.substring(0, 50) + "...");
    
    // Verify Cloudinary configuration first
    console.log("Cloudinary config check:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing",
      api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
      api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing",
    });
    
    console.log("Attempting Cloudinary upload");
    try {
      // FIXED: Don't add the prefix again, either:
      // 1. Use the dataUrl directly which already has the prefix
      const uploadResponse = await cloudinary.uploader.upload(
        dataUrl,
        {
          folder: "sportify",
          resource_type: "image",
          // Don't use userId as public_id as it will overwrite previous images
          public_id: `${userId}_${Date.now()}`, 
          type: "upload",
        }
      );
      console.log("Cloudinary upload successful");
      
      console.log("Creating database entry");
      try {
        const newGraphic = new Graphic({
          userId,
          imageUrl: uploadResponse.secure_url,
        });

        console.log("Saving to database");
        await newGraphic.save();
        console.log("Database save successful");
        
        return new Response(JSON.stringify({ url: uploadResponse.secure_url }), {
          status: 200,
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        return new Response(
          JSON.stringify({ error: "Failed to save to database", details: (dbError as Error).toString() }),
          { status: 500 }
        );
      }
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return new Response(
        JSON.stringify({ error: "Failed to upload to Cloudinary", details: (cloudinaryError as Error).toString() }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("General error in upload API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process upload request", details: (error as Error).toString() }),
      { status: 500 }
    );
  }
}