import type { Note } from "~/types/note";
import { NoteCard } from "../NoteCard";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );

  return (
    <>
      <div className="space-y-2">
        {sortedNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}
