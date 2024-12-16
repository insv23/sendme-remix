import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { action } from "~/routes/notes.new";

import { NoteTextArea } from "./NoteTextArea";
import { FilesList } from "./FilesList";
import { SubmitButton } from "./SubmitButton";
import { FileUploadButton } from "./FileUploadButton";

import { useFileUpload } from "~/hooks/useFileUpload";

export function NoteForm() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const [textareaValue, setTextareaValue] = useState("");
  const {
    uploadFiles,
    addFiles,
    removeFile,
    reset: resetFiles,
    getUploadedFileIds,
    hasOngoingUploads,
  } = useFileUpload();

  useEffect(() => {
    // 当表单提交成功后(navigation.state 变为 idle 且没有错误时)，清除输入框中文字和文件状态
    if (navigation.state === "idle" && !actionData?.error) {
      setTextareaValue("");
      resetFiles();
    }
  }, [navigation.state, actionData, resetFiles]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Form method="post" className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-200 focus-within:ring-1 focus-within:ring-blue-200">
          <NoteTextArea
            isSubmitting={isSubmitting}
            onFilesPasted={addFiles}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />

          <FilesList uploadFiles={uploadFiles} onRemove={removeFile} />

          {getUploadedFileIds().map((fileId) => (
            <input type="hidden" name="fileIds" value={fileId} key={fileId} />
          ))}

          <div className="flex items-center justify-end gap-2 bg-white p-3">
            <FileUploadButton onFileSelect={addFiles} disabled={isSubmitting} />
            <SubmitButton
              isSubmitting={isSubmitting}
              hasOngoingUploads={hasOngoingUploads()}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
