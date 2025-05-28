import { db } from "@libs/firebase/admin";
import { Types } from "use-lanyard";

export async function getLatestListenedMusic() {
  const snapshot = await db.ref("/").get();
  return snapshot.val() as Types.Spotify | undefined;
}