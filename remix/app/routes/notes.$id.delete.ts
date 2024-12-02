import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { deleteNote } from "~/utils/notes.server";

export const loader: LoaderFunction = async () => {
  return redirect("/notes");
};

export const action: ActionFunction = async ({ params }) => {
  console.log("params", params);
  const noteId = params.id;
  if (!noteId) {
    throw new Response("笔记ID不能为空", { status: 400 });
  }

  await deleteNote(noteId);

  // 删除成功后重定向到笔记列表页面
  return redirect("/notes");
};
