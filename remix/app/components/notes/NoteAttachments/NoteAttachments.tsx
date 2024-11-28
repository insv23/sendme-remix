import type { Note } from "~/types/note";
import { FileDownloadButton } from "../FileDownloadButton";

export interface NoteAttachmentsProps {
  note: Note;
}

export function NoteAttachments({ note }: NoteAttachmentsProps) {
  if (note.files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        附件 ({note.files.length})
      </div>
      <div className="space-y-2">
        {note.files.map((file) => (
          <FileDownloadButton key={file} file={file} note={note} />
        ))}
      </div>
    </div>
  );
}
