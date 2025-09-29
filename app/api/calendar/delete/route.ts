import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function POST(req: Request) {
  const { eventId } = await req.json();

  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
  }

  const calendar = getCalendarClient();

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
    sendUpdates: "all",
  });

  return NextResponse.json({ success: true, message: "Event deleted" });
}
