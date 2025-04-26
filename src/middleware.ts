import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    // Define protected page routes
    const isProtectedPage = ["/graphic", "/collections"].some(
        (path) => req.nextUrl.pathname.startsWith(path)
    );

    // Define protected API routes that need authentication
    const isProtectedApi = [
        "/api/graphics", 
        "/api/upload",
        "/api/openai"
        // Add "/api/test-cloudinary" if you decide to keep it
    ].some((path) => req.nextUrl.pathname.startsWith(path));

    // Special case for API routes with dynamic params like /api/graphics/[id]
    const isGraphicsIdRoute = req.nextUrl.pathname.match(/^\/api\/graphics\/[^\/]+$/);

    // Check if the current route needs protection
    if ((isProtectedPage || isProtectedApi || isGraphicsIdRoute) && !token) {
        if (req.nextUrl.pathname.startsWith("/api/")) {
            return new NextResponse(
                JSON.stringify({ error: "Unauthorized" }),
                { 
                    status: 401,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        
        // For page routes, redirect to login
        return NextResponse.redirect(new URL("/login?callbackMessage=auth", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Page routes
        "/graphic/:path*",
        "/collections/:path*",
        // API routes
        "/api/graphics/:path*", 
        "/api/upload/:path*",
        "/api/openai/:path*"
        // Uncomment if you decide to keep test-cloudinary
        // "/api/test-cloudinary/:path*" 
    ],
}