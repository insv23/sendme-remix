export type UploadStatus = "pending" | "uploading" | "success" | "error";

export interface UploadFile {
  id: string;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  rawFile: File; // 添加原始文件引用
}

export interface UploadResponse {
  id: string;
  url: string;
}
