import { getPb } from "./pb.server";
import { redirect } from "@remix-run/node";
import type { FileRecord, PocketBaseFileRecord } from "~/types/note";

// 上传文件
export async function uploadFile(file: File, noteId?: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
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
    // 为每个文件上传请求添加唯一的 requestKey，不然 pb 会只上传最后一个文件
    // https://github.com/pocketbase/js-sdk?tab=readme-ov-file#auto-cancellation
    const requestKey = `upload_${file.name}_${Date.now()}`;
    const record = await pb.collection("files").create(formData, {
      requestKey,
    });
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

// 获取笔记的所有关联文件
export async function getFilesByNoteId(noteId: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  try {
    const records = await pb
      .collection("files")
      .getFullList<PocketBaseFileRecord>({
        filter: `note ~ "${noteId}"`,
      });
    const files = records.map((record) => transformFileRecord(pb, record));
    if (files.length > 0) {
      // TODO: delete
      console.log("🦜 files[0]", files[0]);
    }
    return files;
  } catch (error) {
    console.error("🙂‍↕️ 获取笔记文件失败:", error);
    throw new Error("🙂‍↕️ 获取笔记文件失败");
  }
}

// 将 PocketBase 的文件记录转换为标准文件格式
function transformFileRecord(
  pb: any,
  record: PocketBaseFileRecord
): FileRecord {
  /**
   * 内部 url, 形如 http://db:8090/api/files/files/os9bwrx2dkdb4en/pho2_jYYH0MIjYT.png
   *  `http://db:8090` 是 Docker 容器中的 PocketBase 服务地址，用户无法访问
   *  `/api/files/files/os9bwrx2dkdb4en/pho2_jYYH0MIjYT.png` 则会基于当前域自动生成完整 url
   */
  const innerUrl = pb.files.getUrl(record, record.file);
  const publicUrl = innerUrl.replace("http://db:8090", "");
  return {
    ...record,
    name: record.file, // 重命名为更直观的字段名
    url: publicUrl,
  };
}
