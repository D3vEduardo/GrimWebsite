import { Types } from "use-lanyard";
import { db } from "./admin";

export async function setLatestListenedMusic(data: Types.Spotify) {
    await db.ref("/").set(data);
    const snapshot = await db.ref("/").get();
    return snapshot.val() as Types.Spotify;
}