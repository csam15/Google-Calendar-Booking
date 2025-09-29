import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("Environment check:");
  console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
  console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);

  const { username, password } = await request.json();
  console.log(username);
  console.log(password);

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // Set secure auth cookie
    response.cookies.set("auth-token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
