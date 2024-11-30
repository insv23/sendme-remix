import PocketBase from "pocketbase";

let pb: PocketBase | null = null;

export async function getPb() {
  if (!pb) {
    pb = new PocketBase("http://db:8090");
  }
  return pb;
}

// TODO: refactor this file to pb.server.ts