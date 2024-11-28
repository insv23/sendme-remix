import type { Note } from "~/types/note";
import { getPb } from "./pb";

export async function getNotes() {
  const pb = await getPb();
  return pb.collection("notes").getFullList<Note>();
}

export async function getNote(id: string) {
  const pb = await getPb();
  return pb.collection("notes").getOne<Note>(id);
}

export async function createNote(data: Partial<Note>) {
  const pb = await getPb();
  return pb.collection("notes").create<Note>(data);
}
