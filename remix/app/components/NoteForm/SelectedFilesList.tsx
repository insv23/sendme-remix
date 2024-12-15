interface SelectedFilesListProps {
  files: File[];
}

export function SelectedFilesList({ files }: SelectedFilesListProps) {
  if (files.length === 0) return null;

  return (
    <div className="border-t border-gray-200 p-3">
      <div className="text-sm text-gray-500 mb-2">已选择的文件:</div>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="text-sm text-gray-700">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
