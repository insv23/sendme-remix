import type { Note } from "~/types/note";
import { NoteHeader } from "../NoteHeader";
import { NoteAttachments } from "../NoteAttachments";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white pt-2 pb-4 px-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <NoteHeader note={note} />

      <div className="prose prose-gray dark:prose-invert">
        <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
      </div>

      {note.expand?.files && note.expand.files.length > 0 && (
        <>
          <p>有附件</p> // FIXME: 为啥文件不展示
          <NoteAttachments note={note} />
        </>
      )}
    </div>
  );
}
