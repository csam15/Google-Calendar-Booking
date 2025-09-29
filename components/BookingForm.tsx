"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const meetingType = ["option1", "option2"] as const;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid Email"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: "Invalid phone format",
    }),
  meetingType: z.enum(meetingType, {
    message: "Please select a meeting type",
  }),
  selectedDate: z.string().min(1, "Please select a date"),
  selectedTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AvailableSlot {
  start: string;
  end: string;
}

export default function BookingForm() {
  const [selected, setSelected] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchedMeetingType = watch("meetingType");

  // Fetch available slots when date or meeting type changes
  useEffect(() => {
    if (selected && watchedMeetingType) {
      fetchAvailableSlots();
    } else {
      setAvailableSlots([]);
    }
  }, [selected, watchedMeetingType]);

  const fetchAvailableSlots = async () => {
    if (!selected) return;

    setLoadingSlots(true);
    try {
      const duration = watchedMeetingType === "option1" ? 60 : 30;

      // Use the same local date format
      const year = selected.getFullYear();
      const month = String(selected.getMonth() + 1).padStart(2, "0");
      const day = String(selected.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;

      const response = await fetch(
        `/api/calendar/availability?date=${dateStr}&duration=${duration}`
      );
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data.availableSlots || []);
      } else {
        console.error("Failed to fetch availability:", data.error);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Booking confirmed! Check your email for details.");
        reset();
        setSelected(undefined);
        setAvailableSlots([]);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelected(date);

    if (date) {
      // Use local date format instead of ISO to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const localDateStr = `${year}-${month}-${day}`;


      setValue("selectedDate", localDateStr);
    } else {
      setValue("selectedDate", "");
    }
    setValue("selectedTime", ""); // Clear selected time when date changes
  };

  const formatTimeSlot = (slot: AvailableSlot) => {
    const start = new Date(slot.start);
    return start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 grid-rows-[1fr_auto] space-x-8"
      >
        <div className="flex flex-col items-center justify-center gap-4 border rounded-xl p-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name *
            </label>
            <input {...register("name")} id="name" className="form-input" />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form-input"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="form-input"
            />
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>

          {/* Meeting Type Dropdown */}
          <div className="flex flex-col items-center justify-center">
            <select {...register("meetingType")} className="form-input">
              <option value="">Select meeting type</option>
              {meetingType.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            {errors.meetingType && (
              <p className="error-message">{errors.meetingType.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              className="form-input"
              placeholder="Please provide topics for discussion..."
            />
          </div>
        </div>

        <div className="border rounded-xl p-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Date *
            </label>
            <DayPicker
              mode="single"
              required
              selected={selected}
              onSelect={handleDateSelect}
              disabled={{ before: new Date() }}
            />
            <input
              type="hidden"
              {...register("selectedDate")}
              value={selected ? selected.toLocaleDateString() : ""}
            />
            {errors.selectedDate && (
              <p className="error-message">{errors.selectedDate.message}</p>
            )}
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Available Times *
            </label>

            {!selected && (
              <p className="text-gray-500 text-sm mb-2">
                Please select a date first
              </p>
            )}

            {selected && !watchedMeetingType && (
              <p className="text-gray-500 text-sm mb-2">
                Please select a meeting type first
              </p>
            )}

            {loadingSlots && (
              <p className="text-blue-500 text-sm mb-2">
                Loading available times...
              </p>
            )}

            {selected &&
              watchedMeetingType &&
              !loadingSlots &&
              availableSlots.length === 0 && (
                <p className="text-red-500 text-sm mb-2">
                  No available times for this date
                </p>
              )}

            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot, index) => (
                <label key={index} className="cursor-pointer">
                  <input
                    {...register("selectedTime")}
                    type="radio"
                    value={slot.start}
                    className="hidden peer"
                    disabled={!selected}
                  />
                  <div
                    className="form-input text-center peer-checked:bg-blue-500 peer-checked:text-white
                    hover:bg-blue-100 disabled:opacity-50"
                  >
                    {formatTimeSlot(slot)}
                  </div>
                </label>
              ))}
            </div>
            {errors.selectedTime && (
              <p className="error-message">{errors.selectedTime.message}</p>
            )}
          </div>
        </div>

        <div className="col-span-2 flex justify-center items-center py-4">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !isValid ||
              (selected && watchedMeetingType && availableSlots.length === 0)
            }
            className={`submit-button ${
              isValid ? "" : "hover:bg-red-500"
            } text-2xl`}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
