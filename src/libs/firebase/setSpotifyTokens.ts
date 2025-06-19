import { db } from "./admin";
import { SpotifyAuthPayload } from "@type/SpotifyApiTypes";

export async function setSpotifyTokens(data: SpotifyAuthPayload): Promise<SpotifyAuthPayload> {
    await db.ref("/").set(data);
    const snapshot = await db.ref("/").get();
    return snapshot.val();
}