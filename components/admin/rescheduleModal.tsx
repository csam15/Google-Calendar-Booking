"use client";

import { useState } from "react";

export default function RescheduleModal({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
  eventTitle: string;
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Reschedule Event</h2>
        <p className="mb-4">
          Event: <span className="font-semibold">{eventTitle}</span>
        </p>

        <label className="block mb-2">
          New Start:
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-4">
          New End:
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border p-2 w-full"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Convert datetime-local to ISO string
              const startISO = new Date(start).toISOString();
              const endISO = new Date(end).toISOString();
              onConfirm(startISO, endISO);
            }}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            disabled={!start || !end}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
