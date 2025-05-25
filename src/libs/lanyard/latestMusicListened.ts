import { LanyardWebsocket } from "node-lanyard";
import { Config, JsonDB } from "node-json-db"
import { discordUserId } from "@constants";
import { JSONFilePreset } from "lowdb/node";

const defaultDatabaseValue = {"timestamps":{"start":1748212063651,"end":1748212307837},"album":"Queen of Tears (Original Television Soundtrack), Pt.4","album_art_url":"https://i.scdn.co/image/ab67616d0000b2737533b658892e7b8dcfdaecb7","artist":"Crush","song":"Love You With All My Heart","track_id":"0UaaFmF3xUwMjnuAHBq7qL"}

export const db = await JSONFilePreset('db.json', {});

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