import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function POST(req: Request) {
  try {
    const { eventId, start, end } = await req.json();

    if (!eventId || !start || !end) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate date formats
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const calendar = getCalendarClient();

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      requestBody: {
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "America/New_York"
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "America/New_York"
        },
      },
      sendUpdates: "all",
    });

    return NextResponse.json({
      success: true,
      message: "Event rescheduled",
      event: response.data
    });
  } catch (error: any) {
    console.error("Reschedule error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to reschedule event" },
      { status: 500 }
    );
  }
}
