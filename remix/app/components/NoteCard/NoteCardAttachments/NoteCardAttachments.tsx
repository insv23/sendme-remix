import type { FileRecord } from "~/types/note";
import { AttachmentCard } from "./AttachmentCard";

export interface NoteCardAttachmentsProps {
  attachments: FileRecord[];
}

export function NoteCardAttachments({ attachments }: NoteCardAttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="space-y-2">
        {attachments.map((file: FileRecord) => (
          <AttachmentCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
