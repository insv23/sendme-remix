import { FilePreview } from "./FilePreview";
import { RemoveButton } from "./RemoveButton";
import { useFilePreview } from "./useFilePreview";

import { truncateFilename } from "~/utils/formatters";

interface FileListItemProps {
  file: File;
  onRemove: () => void;
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
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

      <RemoveButton onClick={onRemove} />
    </div>
  );
}
