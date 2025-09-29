import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const duration = parseInt(searchParams.get("duration") || "30");
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0];

    // Validate date format and force local timezone
    const selectedDate = new Date(date + 'T12:00:00'); // Add noon to avoid timezone shifts
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    const calendar = getCalendarClient();

    const timeMin = new Date(selectedDate);
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date(selectedDate);
    timeMax.setHours(23, 59, 59, 999);

    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        timeZone: "America/New_York",
        items: [{ id: "primary" }],
      },
    });

    const busySlots = res.data.calendars?.primary?.busy || [];

    // Generate slots (9am–5pm)
    const slots: { start: string; end: string }[] = [];
    let current = new Date(selectedDate);
    current.setHours(9, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(17, 0, 0, 0);

    while (current < endOfDay) {
      const slotEnd = new Date(current.getTime() + duration * 60000);

      // Fix the type safety issue
      const overlaps = busySlots.some((b) => {
        if (!b.start || !b.end) return false;
        const busyStart = new Date(b.start);
        const busyEnd = new Date(b.end);
        return busyStart < slotEnd && busyEnd > current;
      });

      if (!overlaps && slotEnd <= endOfDay) {
        slots.push({
          start: current.toISOString(),
          end: slotEnd.toISOString(),
        });
      }

      current = new Date(current.getTime() + 30 * 60000); // move forward 30 min
    }

    return NextResponse.json({
      date: selectedDate.toISOString().split("T")[0],
      availableSlots: slots,
      totalSlots: slots.length,
    });
  } catch (err: any) {
    console.error("Availability check error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to check availability" },
      { status: 500 }
    );
  }
}
