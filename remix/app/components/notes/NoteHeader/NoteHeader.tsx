import type { Note } from "~/types/note";
import { formatDate } from "~/utils/formatters";
import { NoteMenu } from "../NoteMenu";

export interface NoteHeaderProps {
  note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <time className="text-sm text-gray-400 dark:text-gray-400">
        {formatDate(note.created)}
      </time>
      <NoteMenu noteId={note.id} />
    </div>
  );
}
