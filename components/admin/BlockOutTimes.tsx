"use client";

  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { DayPicker } from "react-day-picker";
  import "react-day-picker/style.css";

  const blockTimeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    startTime: z.string(),
    endTime: z.string(),
    isAllDay: z.boolean(),
    recurring: z.enum(["none", "daily", "weekly", "monthly"]),
    description: z.string().optional(),
  }).refine((data) => {
    // If not all day, require start and end times
    if (!data.isAllDay) {
      return data.startTime.length > 0 && data.endTime.length > 0;
    }
    return true;
  }, {
    message: "Start and end times are required for timed events",
    path: ["startTime"], // This will show the error on startTime field
  });

  type BlockTimeData = z.infer<typeof blockTimeSchema>;

  export default function BlockTimeForm() {
    const [selectedStartDate, setSelectedStartDate] = useState<Date>();
    const [selectedEndDate, setSelectedEndDate] = useState<Date>();
    const [isAllDay, setIsAllDay] = useState(false);

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      clearErrors,
      trigger,
      formState: { errors, isSubmitting, isValid },
    } = useForm<BlockTimeData>({
      resolver: zodResolver(blockTimeSchema),
      defaultValues: {
        isAllDay: false,
        recurring: "none",
        startTime: "",
        endTime: "",
      },
      mode: "onChange", // Revalidate on change
    });

    const onSubmit = async (data: BlockTimeData) => {
      try {
        const blockData = {
          ...data,
          summary: data.title + " (BLOCKED)",
          start: isAllDay
            ? { date: data.startDate }
            : {
                dateTime: new Date(`${data.startDate}T${data.startTime}`).toISOString(),
                timeZone: "America/New_York"
              },
          end: isAllDay
            ? { date: data.endDate }
            : {
                dateTime: new Date(`${data.endDate}T${data.endTime}`).toISOString(),
                timeZone: "America/New_York"
              },
        };

        const response = await fetch('/api/calendar/block-time', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blockData),
        });

        if (response.ok) {
          alert('Time blocked successfully!');
          reset();
          setSelectedStartDate(undefined);
          setSelectedEndDate(undefined);
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        alert('Failed to block time. Please try again.');
      }
    };

    const handleStartDateSelect = (date: Date | undefined) => {
      setSelectedStartDate(date);
      if (date) {
        const dateStr = date.toISOString().split('T')[0];
        setValue("startDate", dateStr);
        // Auto-set end date to same day if not set
        if (!selectedEndDate) {
          setSelectedEndDate(date);
          setValue("endDate", dateStr);
        }
      }
    };

    const handleEndDateSelect = (date: Date | undefined) => {
      setSelectedEndDate(date);
      setValue("endDate", date ? date.toISOString().split('T')[0] : "");
    };

    return (
      <div className="p-4 rounded-xl border bg-blue-300 my-3 min-w-sm max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">Block Out Time</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="form-label">Block Title *</label>
            <input
              {...register("title")}
              className="form-input w-full"
              placeholder="e.g., Out of Office, Vacation, Meeting"
            />
            {errors.title && <p className="error-message">{errors.title.message}</p>}
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center gap-2">
            {/* Hidden input to register isAllDay with react-hook-form */}
            <input
              {...register("isAllDay")}
              type="hidden"
              value={isAllDay ? "true" : "false"}
            />
            <input
              type="checkbox"
              id="allDay"
              checked={isAllDay}
              onChange={async (e) => {
                const checked = e.target.checked;
                setIsAllDay(checked);
                setValue("isAllDay", checked);

                // Clear time fields and errors when switching to all-day
                if (checked) {
                  setValue("startTime", "");
                  setValue("endTime", "");
                  clearErrors(["startTime", "endTime"]);
                }

                // Trigger revalidation to update form validity
                await trigger();
              }}
              className="w-4 h-4"
            />
            <label htmlFor="allDay" className="form-label">All Day Event</label>
          </div>

          {/* Date Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-xl p-2">
              <label className="form-label">Start Date *</label>
              <DayPicker
                mode="single"
                selected={selectedStartDate}
                onSelect={handleStartDateSelect}
                disabled={{ before: new Date() }}
              />
              {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
            </div>

            <div className="border rounded-xl p-2">
              <label className="form-label">End Date *</label>
              <DayPicker
                mode="single"
                selected={selectedEndDate}
                onSelect={handleEndDateSelect}
                disabled={{ before: selectedStartDate || new Date() }}
              />
              {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Time Selection (if not all day) */}
          {!isAllDay && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Start Time *</label>
                <input
                  {...register("startTime")}
                  type="time"
                  className="form-input !border-black w-full"
                />
                {errors.startTime && <p className="error-message">{errors.startTime.message}</p>}
              </div>

              <div>
                <label className="form-label">End Time *</label>
                <input
                  {...register("endTime")}
                  type="time"
                  className="form-input !border-black w-full"
                />
                {errors.endTime && <p className="error-message">{errors.endTime.message}</p>}
              </div>
            </div>
          )}

          {/* Recurring Options */}
          <div>
            <label className="form-label ">Repeat</label>
            <select {...register("recurring")} className="form-input !border-black w-full">
              <option value="none">No Repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description (optional)</label>
            <textarea
              {...register("description")}
              className="form-input !border-black w-full"
              rows={3}
              placeholder="Additional notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="submit-button bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700
  disabled:opacity-50"
            >
              {isSubmitting ? "Blocking..." : "Block Time"}
            </button>
          </div>
        </form>
      </div>
    );
  }