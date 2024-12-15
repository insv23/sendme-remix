import { useRef } from "react";
import { Upload } from "lucide-react";

interface FileUploadButtonProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUploadButton({
  onFileSelect,
  disabled,
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileSelect(files);
  };
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        Upload <Upload className="w-4 h-4" />
      </button>
    </>
  );
}
