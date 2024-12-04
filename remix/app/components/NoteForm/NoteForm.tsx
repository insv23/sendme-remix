import { useState, useRef, useEffect } from "react";
import { Form } from "@remix-run/react";
import { useActionData, useNavigation, useFetcher } from "@remix-run/react";
import type { action } from "~/routes/notes.new";
import { NoteTextArea } from "./NoteTextArea";
import { SendHorizontal, Upload } from "lucide-react";

interface UploadResponse {
  id: string;
}

export function NoteForm() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const [textareaValue, setTextareaValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFetcher = useFetcher();
  const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);

  // FIXME: 同时选择多个文件时，前几个上传失败, 只有最后一个上传成功
  const uploadFiles = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);
      uploadFetcher.submit(formData, {
        method: "post",
        action: "/file/upload",
        encType: "multipart/form-data",
      });
    });
  };

  useEffect(() => {
    // 存储成功上传的文件 ID
    const data = uploadFetcher.data as UploadResponse;
    // TODO: 使用完删除
    console.log("🦴 uploadFetcher.data", uploadFetcher.data);
    if (data?.id) {
      setUploadedFileIds((prev) => [...prev, data.id]);
    }
  }, [uploadFetcher.data]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    uploadFiles(files);
  };

  // 点击自定义的上传按钮时，实际上是在间接触发隐藏的文件输入框
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // 当表单提交成功后(navigation.state 变为 idle 且没有错误时)，清除输入框中文字和文件状态
    if (navigation.state === "idle" && !actionData?.error) {
      setTextareaValue("");
      setSelectedFiles([]);
      setUploadedFileIds([]);
    }
  }, [navigation.state, actionData]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Form method="post" className="space-y-4">
        <div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-200">
            <NoteTextArea
              isSubmitting={isSubmitting}
              onFilesPasted={uploadFiles}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />

            {selectedFiles.length > 0 && (
              <div className="border-t border-gray-200 p-3">
                <div className="text-sm text-gray-500 mb-2">已选择的文件:</div>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 添加隐藏的 input 字段来传递文件 ID */}
            {uploadedFileIds.map((fileId) => (
              <input key={fileId} type="hidden" name="fileIds" value={fileId} />
            ))}

            <div className="flex items-center justify-end gap-2 bg-white p-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                multiple
              />
              <button
                type="button"
                onClick={handleUploadClick}
                className="flex items-center gap-1 rounded bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
              >
                Upload <Upload className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1 rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Send <SendHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {actionData?.error && (
            <p className="mt-1 text-sm text-red-600">{actionData.error}</p>
          )}
        </div>
      </Form>
    </div>
  );
}
