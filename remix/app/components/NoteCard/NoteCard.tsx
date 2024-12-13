import type { Note } from "~/types/note";
import { NoteCardHeader } from "./NoteCardHeader";
import { NoteCardAttachments } from "./NoteCardAttachments";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white pt-2 pb-4 px-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <NoteCardHeader note={note} />

      <div className="prose prose-gray dark:prose-invert">
        <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
      </div>

      {note.files && note.files.length > 0 && (
        <>
          <NoteCardAttachments attachments={note.files} />
        </>
      )}
    </div>
  );
}
