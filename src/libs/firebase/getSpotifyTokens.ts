import { db } from "@libs/firebase/admin";
import { SpotifyAuthPayload } from "@/types/SpotifyApiTypes";

export async function getSpotifyTokens(): Promise<SpotifyAuthPayload | undefined> {
  const snapshot = await db.ref("/tokens").get();
  return snapshot.val();
}