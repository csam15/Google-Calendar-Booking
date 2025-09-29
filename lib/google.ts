import { google } from "googleapis";

export function getCalendarClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Check if we have the required tokens
  if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error(
      "Google refresh token not found. Please authenticate first."
    );
  }

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    access_token: process.env.GOOGLE_ACCESS_TOKEN, // Optional
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}
