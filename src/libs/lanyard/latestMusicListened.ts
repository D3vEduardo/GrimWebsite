import { LanyardWebsocket } from "node-lanyard";
import { discordUserId } from "@constants";


export const initialized = new Map<string, boolean>();
initialized.set("_", false);

export function latestMusicListened() {
    if (initialized.get("_") === true) return;
    const ws = new LanyardWebsocket(discordUserId);

    console.log("Conectando websocket...")
    ws.on("update", async data => {
      if (data.listening_to_spotify) {
        await db.update(() => data);
        console.log("Sucesso ao atualizar dados do spotify.")
      }
    });

    ws.connect();
    initialized.set("_", true);
    console.log("Websocket conectado!")
}