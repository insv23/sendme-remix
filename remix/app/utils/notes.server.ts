import type { Note } from "~/types/note";
import { getPb } from "./pb.server";
import { redirect } from "@remix-run/node";

export async function getNotes() {
  const pb = await getPb();
  if (!pb.authStore.isValid) {
    throw redirect("/login");
  }
  const userId = JSON.parse(atob(pb.authStore.token.split(".")[1])).id;
  return pb.collection("notes").getFullList<Note>({
    filter: `created_by ~ "${userId}"`,
  });
}

export async function getNote(id: string) {
  const pb = await getPb();
  return pb.collection("notes").getOne<Note>(id);
}

export async function createNote(data: Partial<Note>) {
  const pb = await getPb();
  return pb.collection("notes").create<Note>(data);
}
