import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

/**
 * 文件上传钩子工作流程
 * 1. 用户选择文件
 * uploadFiles([file1, file2]);
 * 2. 自动对每个文件进行上传
 *       files.forEach((file) => {
 *         const formData = new FormData();
 *         formData.append("file", file);
 *         uploadFetcher.submit(formData, {
 *           method: "post",
 *           action: "/file/upload",
 *           encType: "multipart/form-data",
 *         });
 *       });
 * 3. 服务器响应
 * 对每个成功上传的文件，服务器返回 { id: "file_123" }
 * 4. useEffect 捕获响应
 * 每当 uploadFetcher.data 更新时
 * useEffect 会运行并更新 uploadedFileIds
 */

interface UseFileUploadResult {
  selectedFiles: File[];
  uploadedFileIds: string[];
  uploadFiles: (files: File[]) => void;
  reset: () => void;
}

export function useFileUpload(): UseFileUploadResult {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);
  const uploadFetcher = useFetcher();

  /**
   * useCallback 是 React 中的一个钩子，用于优化性能
   * useCallback 返回一个 memoized(记忆化) 的回调函数
   * 如果依赖项没有发生变化，则返回相同的函数
   * 如果依赖项发生变化，则返回一个新的函数
   *
   * 在 React 中，每次组件重渲染时，内部定义的函数都会重新创建
   *
   * 如果不使用 useCallback，每次 NoteForm 重渲染时都会创建一个新的 uploadFiles 函数
   * 这会导致接收这个函数的子组件（如 FileUploadButton）也重新渲染
   */
  const uploadFiles = useCallback(
    (files: File[]) => {
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
    },
    [uploadFetcher]
  );

  useEffect(() => {
    const data = uploadFetcher.data as { id: string };
    if (data?.id) {
      setUploadedFileIds((prev) => [...prev, data.id]);
    }
  }, [uploadFetcher.data]);

  // 点击发送按钮, 表单提交成功后，清除已上传的文件
  const reset = useCallback(() => {
    setSelectedFiles([]);
    setUploadedFileIds([]);
  }, []);

  return {
    selectedFiles,
    uploadedFileIds,
    uploadFiles,
    reset,
  };
}
