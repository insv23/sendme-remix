import { getPb } from "./pb.server";
import { redirect } from "@remix-run/node";

// 上传文件
export async function uploadFile(file: File, noteId?: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid || !pb.authStore.token) {
    throw redirect("/login");
  }

  // 使用 blob 替代直接使用 File 对象
  // 直接使用 File 对象可能会上传失败
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });
  
  const formData = new FormData();
  formData.append("file", blob, file.name);
  formData.append(
    "created_by",
    JSON.parse(atob(pb.authStore.token.split(".")[1])).id
  );
  if (noteId) {
    formData.append("note", noteId);
  }

  try {
    const record = await pb.collection("files").create(formData);
    console.log("💬 file uploaded", record);
    return record;
  } catch (error) {
    console.error("文件上传失败:", error);
    throw new Error("文件上传失败");
  }
}

// 关联文件到笔记
export async function attachFileToNote(fileId: string, noteId: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  try {
    return pb.collection("files").update<FileRecord>(fileId, {
      note: [noteId],
    });
  } catch (error) {
    console.error("关联文件失败:", error);
    throw new Error("关联文件失败");
  }
}

