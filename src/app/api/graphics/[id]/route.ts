// app/api/graphics/[id]/route.ts
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Graphic from "@/models/Graphic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from 'cloudinary';


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
  
) {
  try {
    // Connect to the database
    await connectDB();
    
    // Get the user session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const { id } = await params;
    const userId = session.user.id;
    const graphicId = id;
    
    // Find the graphic and ensure it belongs to the current user
    const graphic = await Graphic.findOne({ _id: graphicId, userId });
    
    if (!graphic) {
      return new Response(JSON.stringify({ error: "Graphic not found" }), {
        status: 404,
      });
    }
    
    // Extract public_id from imageUrl
    // Cloudinary URLs look like: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.jpg
    const imageUrl = graphic.imageUrl;
    let publicId = '';
    
    try {
      // Parse the URL to get the public_id
      const urlParts = imageUrl.split('/');
      // Get everything after the version number (v1234567890/)
      const afterVersion = urlParts.slice(urlParts.findIndex((part : string) => part.startsWith('v')) + 1).join('/');
      // Remove file extension
      publicId = afterVersion.substring(0, afterVersion.lastIndexOf('.'));
    } catch (error) {
      console.error("Error extracting Cloudinary public_id:", error);
      // If we can't extract the public_id, we'll still delete from the database
    }
    
    // Delete from Cloudinary if we have a public_id
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // We'll continue with the database deletion even if Cloudinary fails
      }
    }
    
    // Delete the graphic from the database
    await Graphic.deleteOne({ _id: graphicId });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error deleting graphic:", err);
    return new Response(JSON.stringify({ error: "Failed to delete graphic" }), {
      status: 500,
    });
  }
}