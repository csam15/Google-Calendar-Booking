import { NextRequest, NextResponse } from "next/server";

// Check if user is authenticated
export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (token === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
