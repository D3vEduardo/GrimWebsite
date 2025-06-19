import { db } from "./admin";
import { SpotifyAuthPayload } from "@type/SpotifyApiTypes";

export async function setSpotifyTokens(data: SpotifyAuthPayload): Promise<SpotifyAuthPayload> {
    await db.ref("/tokens").set(data);
    const snapshot = await db.ref("/tokens").get();
    return snapshot.val();
}