"use client";

import { Loader } from "lucide-react";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import ConfirmModal from "./ConfirmModal";
import RescheduleModal from "./rescheduleModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShowEvents() {
  const [showEvents, setShowEvents] = useState<boolean>(true);
  const [modalType, setModalType] = useState<"delete" | "reschedule" | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const { data, isLoading, mutate } = useSWR("/api/calendar/events", fetcher, {
    refreshInterval: 120000, // Auto-refresh every 30 seconds
    revalidateOnFocus: true, // Refresh when tab becomes active
  });

  const events = data || [];

  const handleClick = () => {
    setShowEvents(!showEvents);
  };

  async function handleDelete(eventId: string) {
    const res = await fetch("/api/calendar/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });

    if (res.ok) {
      mutate();
      setModalType(null);
    } else {
      console.error("Failed to delete event");
    }
  }

  async function handleReschedule(eventId: string, start: string, end: string) {
    await fetch("/api/calendar/reschedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, start, end }),
    });
    mutate();
    setModalType(null);
    setSelectedEvent(null);
  }

  return (
    <div className="p-4 rounded-xl border bg-blue-300 my-3 max-w-lg">
      <div>
        <div
          className={`flex items-center justify-between w-full ${
            showEvents ? "pb-4" : ""
          } gap-8`}
        >
          <h1 className="text-xl text-black">Events in the next 7 Days</h1>
          <button
            onClick={handleClick}
            disabled={isLoading}
            className="submit-button border border-black"
          >
            {showEvents ? "Hide" : "Show"}
          </button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader className="animate-spin size-15" />
          </div>
        ) : showEvents ? (
          <div className="space-y-2">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="text-white p-2 rounded-xl text-center full-shadow bg-blue-600"
              >
                <div className="font-semibold text-xl">{event.summary}</div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-3 place-items-start space-x-4">
                  <span>Date:</span>
                  <span>
                    {new Date(event.start).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </span>
                  <span>From:</span>
                  <span>
                    {new Date(event.start).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                  </span>
                  <span>To:</span>
                  <span>
                    {new Date(event.end).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                  </span>
                </div>

                {event.attendees?.length && (
                  <div className="text-left py-2">
                    <span className="font-bold">Attendees:</span>{" "}
                    {event.attendees.join(", ")}
                  </div>
                )}
                <div className="pt-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setModalType("delete");
                    }}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setModalType("reschedule");
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {/* Modals */}
        {modalType === "delete" && selectedEvent && (
          <ConfirmModal
            isOpen={true}
            onClose={() => setModalType(null)}
            onConfirm={() => handleDelete(selectedEvent.id)}
            eventTitle={selectedEvent.summary}
          />
        )}

        {modalType === "reschedule" && selectedEvent && (
          <RescheduleModal
            isOpen={true}
            onClose={() => setModalType(null)}
            onConfirm={(start, end) =>
              handleReschedule(selectedEvent.id, start, end)
            }
            eventTitle={selectedEvent.summary}
          />
        )}
      </div>
    </div>
  );
}
