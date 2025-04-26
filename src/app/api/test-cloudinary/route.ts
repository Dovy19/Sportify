// api/test-cloudinary/route.ts
import { NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

export async function GET(req: NextRequest) {
  try {
    // Log the actual configuration values (safely)
    console.log("Cloudinary Config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key_length: process.env.CLOUDINARY_API_KEY?.length || 0,
      api_secret_length: process.env.CLOUDINARY_API_SECRET?.length || 0
    });
    
    // Manually configure Cloudinary just for this test
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
      api_key: process.env.CLOUDINARY_API_KEY as string,
      api_secret: process.env.CLOUDINARY_API_SECRET as string,
    });
    
    // Create a very simple image (a 1x1 transparent pixel) for testing
    const testBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    
    try {
      console.log("Attempting simple Cloudinary upload test...");
      const uploadResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "test" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        
        uploadStream.end(Buffer.from(testBase64, 'base64'));
      });
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Test upload successful",
        result: uploadResponse
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: unknown) {
      const uploadError = error as any; // Cast to any to access properties safely
      console.error("Test upload error:", uploadError);
      
      // Extract the HTML error if present
      let htmlError = null;
      if (uploadError.message && typeof uploadError.message === 'string' && uploadError.message.includes('<!DOCTYPE')) {
        htmlError = uploadError.message.substring(0, 500);
        console.error("HTML Error content:", htmlError);
      }
      
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Test upload failed",
        error: uploadError.toString ? uploadError.toString() : String(uploadError),
        htmlError
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error: unknown) {
    console.error("General error in test route:", error);
    
    return new Response(JSON.stringify({ 
      success: false,
      message: "Test route error",
      error: error instanceof Error ? error.toString() : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}