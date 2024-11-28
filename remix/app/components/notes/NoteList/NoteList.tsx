import type { Note } from "~/types/note";
import { NoteCard } from "../NoteCard";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <>
      <div className="space-y-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}
