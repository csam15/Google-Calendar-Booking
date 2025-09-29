import { NextResponse } from "next/server";
import { getCalendarClient } from "@/lib/google";
import { z } from "zod";

// Match your form schema
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().optional(),
  meetingType: z.enum(["option1", "option2"]),
  selectedDate: z.string().min(1, "Date is required"),
  selectedTime: z.string().min(1, "Time is required"), // Accept any time string
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the form data
    const validatedData = bookingSchema.parse(body);
    const {
      name,
      email,
      phone,
      meetingType,
      selectedDate,
      selectedTime,
      message,
    } = validatedData;

    // Parse the date and time
    // selectedTime is now an ISO string from the availability API
    const startTime = new Date(selectedTime);

    // Set end time based on meeting type
    const endTime = new Date(startTime);
    const duration = meetingType === "option1" ? 60 : 30; // minutes
    endTime.setMinutes(startTime.getMinutes() + duration);

    const calendar = getCalendarClient();

    // Create the event
    const event = {
      summary: `${
        meetingType.charAt(0).toUpperCase() + meetingType.slice(1)
      } with ${name}`,
      description: `
  Meeting Type: ${meetingType}
  Client: ${name}
  Email: ${email}
  ${phone ? `Phone: ${phone}` : ""}
  ${message ? `\nMessage: ${message}` : ""}
        `.trim(),
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "America/New_York",
      },
      attendees: [{ email: email, displayName: name }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 10 }, // 10 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all", // Send email invitations
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed!",
      event: {
        id: response.data.id,
        htmlLink: response.data.htmlLink,
        summary: response.data.summary,
        start: response.data.start?.dateTime,
        end: response.data.end?.dateTime,
      },
    });
  } catch (error: any) {
    console.error("Booking error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    if (error.code === 409) {
      return NextResponse.json(
        { error: "Time slot is no longer available" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
