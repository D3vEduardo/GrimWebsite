
import { discordUserId } from "@constants";
import { setLatestListenedMusic } from "@libs/firebase/setLatestListenedMusic";
import { Lanyard } from "../ws/lanyard";
import { Types } from "use-lanyard";


let lanyardWs: Lanyard | null = null;

export function initializeLanyardWebSocket() {
  if (lanyardWs && lanyardWs.isAlive()) {
    console.log("Lanyard WebSocket já está conectado e ativo.");
    return;
  }

  console.log("Iniciando conexão Lanyard WebSocket...");
  lanyardWs = new Lanyard(discordUserId);

  lanyardWs.on("presence", async (data) => {
    if (data.listening_to_spotify && data.spotify) {
      await setLatestListenedMusic(data.spotify as Types.Spotify);
      console.log("Música atualizada com sucesso!", data.spotify);
    }
  });

  lanyardWs.on("close", ({ code, reason }) => {
    console.log(`Lanyard WebSocket fechado. Código: ${code}, Razão: ${reason}`);
    lanyardWs = null; // Limpa a instância para permitir reconexão
    // Tenta reconectar após um pequeno atraso
    setTimeout(() => {
      console.log("Tentando reconectar Lanyard WebSocket...");
      initializeLanyardWebSocket();
    }, 5000); // Tenta reconectar após 5 segundos
  });

  lanyardWs.on("error", (error) => {
    console.error("Erro no Lanyard WebSocket:", error);
    lanyardWs = null; // Limpa a instância em caso de erro
  });

  console.log("Lanyard WebSocket conectado!");
  setTimeout(() => {
    console.log("Requisição de atualização de presença enviada!");
    lanyardWs?.requestPresenceUpdate();
  }, 3000);
}

export function getLanyardWebSocketStatus() {
  return lanyardWs && lanyardWs.isAlive();
}