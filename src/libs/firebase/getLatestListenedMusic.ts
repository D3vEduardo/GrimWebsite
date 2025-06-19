import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import { db } from "./admin";

export async function getLatestListenedMusic() {
  const snapshot = await db.ref("/latest_music_listened").get();
  return snapshot.val() as RecentlyPlayedItem[] | undefined;
}