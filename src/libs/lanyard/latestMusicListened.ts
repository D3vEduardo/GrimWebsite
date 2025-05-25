import { LanyardWebsocket } from "node-lanyard";
import { Config, JsonDB } from "node-json-db"
import { discordUserId } from "@constants";

export const db = new JsonDB(new Config("db", true, false, "/", true));

export const initialized = new Map<string, boolean>();
initialized.set("_", false);

export function latestMusicListened() {
    if (initialized.get("_") === true) return;
    const ws = new LanyardWebsocket(discordUserId);

    console.log("Conectando websocket...")
    ws.on("update", async data => {
      if (data.listening_to_spotify) {
        await db.push("/", data.spotify);
        console.log("Sucesso ao atualizar dados do spotify.")
      }
    });

    ws.connect();
    initialized.set("_", true);
    console.log("Websocket conectado!")
}