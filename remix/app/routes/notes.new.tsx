import {
  redirect,
  type ActionFunctionArgs,
  TypedResponse,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNote } from "~/utils/notes.server";
import { NoteForm } from "~/components/NoteForm";
import { attachFileToNote } from "~/utils/files.server";

export async function action({
  request,
}: ActionFunctionArgs): Promise<TypedResponse<any>> {
  const formData = await request.formData();
  const text = formData.get("text") as string;
  const fileIds = formData.getAll("fileIds") as string[];

  // 确保笔记的文字内容和文件不能同时为空
  if (!text?.trim() && fileIds.length === 0) {
    return new Response(JSON.stringify({ error: "笔记内容和文件不能同时为空" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. 创建笔记
    const note = await createNote({
      text,
    });

    // 2. 关联已上传的文件(如果有)
    if (fileIds.length > 0) {
      await Promise.all(
        fileIds.map((fileId) => attachFileToNote(fileId, note.id))
      );
    }

    return redirect("/notes");
  } catch (error) {
    return new Response(JSON.stringify({ error: "创建笔记失败,请稍后重试" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default function NewNote() {
  return <NoteForm />;
}
