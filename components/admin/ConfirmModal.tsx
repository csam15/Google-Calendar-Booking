export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">"{eventTitle}"</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
