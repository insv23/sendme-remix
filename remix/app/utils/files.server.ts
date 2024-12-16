import PocketBase from "pocketbase";

import { getPb } from "./pb.server";
import { redirect } from "@remix-run/node";
import type { FileRecord, PocketBaseFileRecord } from "~/types/note";

// 上传文件
export async function saveFile(file: File, fileId: string, noteId?: string) {
  // 开发环境人为添加延迟
  if (process.env.NODE_ENV === "development") {
    const UPLOAD_DELAY = 2000; // ms
    await new Promise((resolve) => setTimeout(resolve, UPLOAD_DELAY));
  }

  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  // 使用 blob 替代直接使用 File 对象
  // 直接使用 File 对象可能会上传失败
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  const formData = new FormData();
  formData.append("file", blob, file.name);
  formData.append("id", fileId);
  formData.append(
    "created_by",
    JSON.parse(atob(pb.authStore.token.split(".")[1])).id
  );
  if (noteId) {
    formData.append("note", noteId);
  }

  try {
    const record = await pb.collection("files").create(formData, {
      // 为每个文件上传请求添加唯一的 requestKey，不然 pb 会只上传最后一个文件
      // https://github.com/pocketbase/js-sdk?tab=readme-ov-file#auto-cancellation
      requestKey: fileId,
    });
    return record;
  } catch (error) {
    console.error("文件保存失败:", error);
    throw new Error("文件保存失败");
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

// 获取笔记的所有关联文件
export async function getFilesByNoteId(noteId: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  try {
    // 为每个获取文件列表的请求添加唯一的 requestKey
    // Add unique requestKey for each file list request to prevent auto-cancellation
    const requestKey = `get_files_${noteId}_${Date.now()}`;
    const records = await pb
      .collection("files")
      .getFullList<PocketBaseFileRecord>({
        filter: `note ~ "${noteId}"`,
        requestKey,
      });
    const files = records.map((record) => transformFileRecord(pb, record));
    return files;
  } catch (error) {
    console.error("🙂‍↕️ 获取笔记文件失败:", error);
    throw new Error("🙂‍↕️ 获取笔记文件失败");
  }
}

// 将 PocketBase 的文件记录转换为标准文件格式
function transformFileRecord(
  pb: PocketBase,
  record: PocketBaseFileRecord
): FileRecord {
  /**
   * 内部 url, 形如 http://db:8090/api/files/files/os9bwrx2dkdb4en/pho2_jYYH0MIjYT.png
   *  `http://db:8090` 是 Docker 容器中的 PocketBase 服务地址，用户无法访问
   *  `/api/files/files/os9bwrx2dkdb4en/pho2_jYYH0MIjYT.png` 则会基于当前域自动生成完整 url
   */
  const innerUrl = pb.files.getURL(record, record.file);
  const publicUrl = innerUrl.replace("http://db:8090", "");
  return {
    ...record,
    name: record.file, // 重命名为更直观的字段名
    url: publicUrl,
  };
}
