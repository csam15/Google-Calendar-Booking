// Gets all events for the next 7 days to display in admin dashboard

import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDateParam = searchParams.get("start"); // optional
  const endDateParam = searchParams.get("end"); // optional

  const startDate = startDateParam
    ? new Date(startDateParam)
    : new Date();
  startDate.setHours(0, 0, 0, 0);

  const endDate = endDateParam
    ? new Date(endDateParam)
    : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000); // default 7 days
  endDate.setHours(23, 59, 59, 999);

  const calendar = getCalendarClient();

  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: startDate.toISOString(),
    timeMax: endDate.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  const events = res.data.items?.map((event) => ({
    id: event.id,
    summary: event.summary,
    start: event.start?.dateTime || event.start?.date,
    end: event.end?.dateTime || event.end?.date,
    attendees: event.attendees?.map((a) => a.email),
  }));

  return NextResponse.json(events);
}