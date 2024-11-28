import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { NoteList } from "~/components/notes";
import { getNotes } from "~/utils/notes.server";

export const loader = async () => {
  // 确保使用 export const 而不是 export async function
  const notes = await getNotes();
  return json({ notes });
};

export default function NotesIndex() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
        我的笔记
      </h1>
      <NoteList notes={notes} />
    </>
  );
}
