import type { Note } from "~/types/note";
import { formatDate } from "~/utils/formatters";
import { NoteCardMenu } from "./NoteCardMenu";

export interface NoteCardHeaderProps {
  note: Note;
}

export function NoteCardHeader({ note }: NoteCardHeaderProps) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <time className="text-sm text-gray-400 dark:text-gray-400">
        {formatDate(note.created)}
      </time>
      <NoteCardMenu noteId={note.id} />
    </div>
  );
}
