import type { FileRecord } from "~/types/note";
import { NoteAttachmentCard } from "./NoteAttachmentCard/NoteAttachmentCard";

export interface NoteAttachmentsProps {
  attachments: FileRecord[];
}

export function NoteAttachments({ attachments }: NoteAttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="space-y-2">
        {attachments.map((file: FileRecord) => (
          <NoteAttachmentCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
