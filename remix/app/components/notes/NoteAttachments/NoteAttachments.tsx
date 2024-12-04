import type { Note, FileRecord } from "~/types/note";
import { FileDownloadButton } from "./FileDownloadButton";

export interface NoteAttachmentsProps {
  note: Note;
}

export function NoteAttachments({ note }: NoteAttachmentsProps) {
  if (!note.expand?.files || note.expand.files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        附件 ({note.expand.files.length})
      </div>
      <div className="space-y-2">
        {note.expand.files.map((file: FileRecord) => (
          <FileDownloadButton key={file.id} file={file} note={note} />
        ))}
      </div>
    </div>
  );
}
