import { TypedResponse } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { NoteList } from "~/components/notes";
import { NoteForm } from "~/components/NoteForm";
import { getNotes } from "~/utils/notes.server";
import { action as newNoteAction } from "./notes.new";

export const loader = async (): Promise<TypedResponse<{ notes: any }>> => {
  const notes = await getNotes();
  return new Response(JSON.stringify({ notes }), {
    headers: { "Content-Type": "application/json" },
  });
};

export { newNoteAction as action };

export default function NotesIndex() {
  const { notes } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-4">
      <NoteForm />
      <NoteList notes={notes} />
    </div>
  );
}
