import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { NoteCard } from "~/components/notes";
import { getNote } from "~/utils/notes.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const note = await getNote(params.id!);
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
}

export default function NoteDetail() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        <NoteCard note={note} />
      </div>
    </div>
  );
}
