import { FilePreview } from "./FilePreview";
import { RemoveButton } from "./RemoveButton";
import { StatusIcon } from "./StatusIcon";

import { useFilePreview } from "~/hooks/useFilePreview";

import type { UploadStatus } from "~/types/upload";
import { truncateFilename } from "~/utils/formatters";

interface FileListItemProps {
  file: File;
  uploadStatus: UploadStatus;
  onRemove: () => void;
}

export function FileListItem({
  file,
  uploadStatus,
  onRemove,
}: FileListItemProps) {
  const previewUrl = useFilePreview(file);
  const displayFileName = truncateFilename(file.name);

  return (
    <div className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
      <div className="w-10 h-10 mr-3 flex-shrink-0">
        <FilePreview file={file} previewUrl={previewUrl} />
      </div>

      <div className="flex-grow text-sm text-gray-700 truncate">
        {displayFileName}
      </div>

      <StatusIcon status={uploadStatus} />

      <RemoveButton onClick={onRemove} />
    </div>
  );
}
