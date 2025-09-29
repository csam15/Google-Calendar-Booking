"use client";

import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShowEvents() {
  const { data, error, isLoading } = useSWR("/api/calendar/events", fetcher, {
    refreshInterval: 60000, // Auto-refresh every 30 seconds
    revalidateOnFocus: true, // Refresh when tab becomes active
  });

  const events = data || [];

  const handleRefresh = () => {
    mutate("/api/calendar/events");
  };

  return (
    <div className="p-4 rounded-xl border bg-blue-300 my-3">
      <div>
        <h1 className="text-xl text-center pb-4">
          Upcoming Events in the next 7 Days
        </h1>
        <div className="space-y-2">
          {events.map((event: any) => (
            <div
              key={event.id}
              className="border border-white p-2 rounded-xl text-center w-fit"
            >
              <div className="font-semibold text-xl">{event.summary}</div>
              <div>
                {new Date(event.start).toLocaleString()} →{" "}
                {new Date(event.end).toLocaleString()}
              </div>
              {event.attendees?.length && (
                <div>Attendees: {event.attendees.join(", ")}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
