import { useCallback, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { nanoid } from "nanoid";
import type { UploadFile } from "~/types/upload";

export function useFileUpload() {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const deleteFetcher = useFetcher();

  // 添加文件到队列
  const addFiles = useCallback((rawFiles: File[]) => {
    const newUploadFiles = rawFiles.map((rawFile) => ({
      id: nanoid(15),
      status: "pending" as const,
      rawFile: rawFile,
    }));
    setUploadFiles((prev) => [...prev, ...newUploadFiles]);

    // 自动开始上传新添加的文件
    newUploadFiles.forEach(handleFileUpload);
  }, []);

  // 上传单个文件
  const handleFileUpload = useCallback(async (uploadFile: UploadFile) => {
    try {
      // 更新文件状态为上传中
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "uploading" } : f
        )
      );

      // 上传文件
      const formData = new FormData();
      formData.append("file", uploadFile.rawFile);
      formData.append("id", uploadFile.id);

      const response = await fetch("/file/upload", {
        method: "POST",
        body: formData,
      });

      // 同时有很多个文件上传, 它怎么知道返回的 response 是哪个文件上传的 response?
      // 因为 uploadFile 函数是在一个闭包中执行的，每个文件上传都有自己独立的执行上下文，所以它能正确匹配对应文件的 response。
      if (response.ok) {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "success" } : f
          )
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setUploadFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id
            ? { ...f, status: "error", error: errorMessage }
            : f
        )
      );
      throw error;
    }
  }, []);

  // 移除文件
  const removeFile = useCallback(
    async (fileId: string) => {
      const file = uploadFiles.find((f) => f.id === fileId);
      if (!file) return;

      // 如果文件正在上传中，不允许删除
      if (file.status === "uploading") {
        return;
      }

      // 如果文件已上传成功，需要通知服务器删除
      if (file.status === "success") {
        deleteFetcher.submit(
          { id: fileId },
          {
            method: "post",
            action: "/file/delete",
          }
        );
      }

      // 从本地状态中移除文件
      setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
    },
    [uploadFiles, deleteFetcher]
  );

  // 重置所有状态
  const reset = useCallback(() => {
    setUploadFiles([]);
  }, []);

  // 获取已成功上传的文件ID列表
  const getUploadedFileIds = () =>
    uploadFiles.filter((f) => f.status === "success").map((f) => f.id);

  // 检查是否有文件正在上传/等待上传/上传失败
  const hasOngoingUploads = () =>
    uploadFiles.some(
      (f) =>
        f.status === "pending" ||
        f.status === "uploading" ||
        f.status === "error"
    );

  return {
    uploadFiles,
    addFiles,
    removeFile,
    reset,
    getUploadedFileIds,
    hasOngoingUploads,
  };
}
