import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import { db } from "./admin";

export async function setLatestListenedMusic(data: RecentlyPlayedItem[]) {
  await db.ref("/latestListenedMusic").set(data);
  const snapshot = await db.ref("/latestListenedMusic").get();
  return snapshot.val() as RecentlyPlayedItem[] | undefined;
}