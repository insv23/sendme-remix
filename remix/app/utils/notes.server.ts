import type { Note } from "~/types/note";
import { getPb } from "./pb.server";
import { redirect } from "@remix-run/node";
import { getFilesByNoteId } from "./files.server";

export async function getNotes() {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  const userId = JSON.parse(atob(pb.authStore.token.split(".")[1])).id;
  const notes = await pb.collection("notes").getFullList<Note>({
    filter: `created_by ~ "${userId}"`,
  });

  const notesWithFiles = await enrichNotesWithFiles(notes);
  return notesWithFiles;
}

// 为笔记添加文件信息
async function enrichNotesWithFiles(notes: Note[]): Promise<Note[]> {
  // 使用 Promise.all 并行处理所有笔记
  const enrichedNotes = await Promise.all(
    notes.map(async (note) => {
      try {
        const files = await getFilesByNoteId(note.id);
        return {
          ...note,
          files: files,
        };
      } catch (error) {
        console.error(`获取笔记 ${note.id} 的文件失败:`, error);
        // 如果获取文件失败，仍然返回原始笔记
        return note;
      }
    })
  );
  return enrichedNotes;
}

export async function getNote(id: string) {
  const pb = await getPb();
  return pb.collection("notes").getOne<Note>(id);
}

export async function createNote(data: Partial<Note>) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  const userId = JSON.parse(atob(pb.authStore.token.split(".")[1])).id;
  return pb.collection("notes").create<Note>({
    ...data,
    created_by: [userId],
  });
}

export async function deleteNote(id: string) {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }

  // collection 定义了  note 删除时会自动删除关联的 files
  return pb.collection("notes").delete(id);
}
