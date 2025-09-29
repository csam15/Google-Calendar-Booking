import { NextResponse } from "next/server";
import { google } from "googleapis";

// Only used to get refresh and access tokens from google OAuth verification

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    // Generate auth URL
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
      prompt: 'consent'
    });

    return NextResponse.redirect(authUrl);
  }

  // Exchange code for tokens
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);

    return NextResponse.json({
      message: "SUCCESS! Add these tokens to your .env.local file:",
      tokens: {
        GOOGLE_REFRESH_TOKEN: tokens.refresh_token,
        GOOGLE_ACCESS_TOKEN: tokens.access_token,
      },
      instructions: [
        "1. Copy the GOOGLE_REFRESH_TOKEN value below",
        "2. Add it to your .env.local file",
        "3. Restart your development server",
        "4. Your calendar integration will now work!"
      ]
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}