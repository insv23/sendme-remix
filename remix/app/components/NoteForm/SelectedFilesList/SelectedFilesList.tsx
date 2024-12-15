import { FileListItem } from "./FileListItem";

interface SelectedFilesListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function SelectedFilesList({ files, onRemove }: SelectedFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div className="border-t border-gray-200 p-3">
      <div className="text-sm text-gray-500 mb-2">已选择的文件:</div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <FileListItem
            key={index}
            file={file}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
