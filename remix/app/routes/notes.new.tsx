import {
  redirect,
  type ActionFunctionArgs,
  TypedResponse,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createNote } from "~/utils/notes.server";
import { NoteForm } from "~/components/notes";

export async function action({
  request,
}: ActionFunctionArgs): Promise<TypedResponse<any>> {
  const formData = await request.formData();
  const text = formData.get("text") as string;

  if (!text?.trim()) {
    return new Response(JSON.stringify({ error: "笔记内容不能为空" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await createNote({
      text,
      files: [],
    });
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
