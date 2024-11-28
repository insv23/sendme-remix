import type { Note } from "~/types/note";
import {
  formatNoteDate,
  getUserInitial,
  formatUsername,
} from "~/features/notes/utils/noteHelpers";

export interface NoteHeaderProps {
  note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          {getUserInitial(note.user[0])}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {formatUsername(note.user[0])}
        </span>
      </div>
      <time className="text-sm text-gray-500 dark:text-gray-400">
        {formatNoteDate(note.created)}
      </time>
    </div>
  );
}
