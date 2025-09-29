import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, startDate, endDate, startTime, endTime, isAllDay, recurring, description } = data;

    if (!title || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate time fields for non-all-day events
    if (!isAllDay && (!startTime || !endTime)) {
      return NextResponse.json({ error: "Start and end times are required for timed events" }, { status: 400 });
    }

    const calendar = getCalendarClient();

    // Create the event object
    const eventData: {
      summary: string;
      description: string;
      status: string;
      start?: { date: string } | { dateTime: string; timeZone: string };
      end?: { date: string } | { dateTime: string; timeZone: string };
      recurrence?: string[];
    } = {
      summary: `${title} (BLOCKED)`,
      description: description || "Blocked time period",
      status: "confirmed",
    };

    // Set start and end based on whether it's all day
    if (isAllDay) {
      eventData.start = { date: startDate };
      eventData.end = { date: endDate };
    } else {
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        return NextResponse.json({ error: "Invalid date/time format" }, { status: 400 });
      }

      eventData.start = {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/New_York"
      };
      eventData.end = {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/New_York"
      };
    }

    // Handle recurring events
    if (recurring !== "none") {
      const recurrenceMap = {
        daily: "RRULE:FREQ=DAILY",
        weekly: "RRULE:FREQ=WEEKLY",
        monthly: "RRULE:FREQ=MONTHLY"
      };
      eventData.recurrence = [recurrenceMap[recurring as keyof typeof recurrenceMap]];
    }

    // Create the event
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: eventData,
    });

    return NextResponse.json({
      success: true,
      message: "Time blocked successfully",
      event: response.data
    });
  } catch (error: unknown) {
    console.error("Block time error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to block time" },
      { status: 500 }
    );
  }
}