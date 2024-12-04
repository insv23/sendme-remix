interface NoteTextAreaProps {
  isSubmitting: boolean;
  onFilesPasted: (files: File[]) => void;
}

export function NoteTextArea({
  isSubmitting,
  onFilesPasted,
}: NoteTextAreaProps) {
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(event.clipboardData.items);
    const files: File[] = [];

    items.forEach((item) => {
      // 如果不是文本类型，尝试作为文件处理
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    });

    // 如果有文件，则阻止默认粘贴行为并调用回调
    if (files.length > 0) {
      event.preventDefault();
      onFilesPasted(files);
    }
  };
  return (
    <>
      <label htmlFor="OrderNotes" className="sr-only">
        Order notes
      </label>
      <textarea
        id="OrderNotes"
        name="text"
        className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm focus:outline-none p-2"
        rows={4}
        placeholder="在这里输入笔记内容..."
        disabled={isSubmitting}
        onPaste={handlePaste}
      />
    </>
  );
}
