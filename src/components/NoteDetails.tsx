import { X } from "lucide-react";
import { useStore } from "../store";

export function NoteDetails() {
  const { items, selectedNoteId, setSelectedNoteId } = useStore();
  const note = items.find(
    (item) => item.id === selectedNoteId && item.type === "note"
  );

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {note.title}
          </h2>
          <button
            onClick={() => setSelectedNoteId(null)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
}
