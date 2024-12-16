import type { UploadFile } from "~/types/upload";
import { FileListItem } from "./FileListItem";

interface FilesListProps {
  uploadFiles: UploadFile[];
  onRemove: (fileId: string) => void;
}

export function FilesList({ uploadFiles, onRemove }: FilesListProps) {
  if (uploadFiles.length === 0) return null;

  return (
    <div className="border-t border-gray-200 p-3">
      <div className="text-sm text-gray-500 mb-2">已选择的文件:</div>
      <div className="space-y-2">
        {uploadFiles.map((uploadFile) => (
          <FileListItem
            key={uploadFile.id}
            file={uploadFile.rawFile}
            onRemove={() => onRemove(uploadFile.id)}
          />
        ))}
      </div>
    </div>
  );
}
