import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import { db } from "./admin";

export async function getLatestListenedMusic() {
  const snapshot = await db.ref("/latestListenedMusic").get();
  return snapshot.val() as RecentlyPlayedItem[] | undefined;
}