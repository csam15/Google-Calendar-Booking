import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if accessing protected route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for auth token/session
    const token = request.cookies.get("auth-token")?.value;

    if (!token || token !== "authenticated") {
      // Redirect to login if no valid token
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protect all admin routes
};
