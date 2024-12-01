import type { Note } from "~/types/note";
import {
  formatDate,
  formatUserInitial,
  formatUsername,
} from "~/utils/formatters";

export interface NoteHeaderProps {
  note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  const user = note.created_by[0];

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300">
          {user ? formatUserInitial(user) : "?"}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {user ? formatUsername(user) : "未知用户"}
        </span>
      </div>
      <time className="text-sm text-gray-500 dark:text-gray-400">
        {formatDate(note.created)}
      </time>
    </div>
  );
}
