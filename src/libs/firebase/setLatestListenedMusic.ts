import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import { db } from "./admin";

export async function setLatestListenedMusic(data: RecentlyPlayedItem[]) {
  await db.ref("/latest_music_listened").set(data);
  const snapshot = await db.ref("/latest_music_listened").get();
  return snapshot.val() as RecentlyPlayedItem[] | undefined;
}