import { initializeLanyardWebSocket, getLanyardWebSocketStatus } from "@/libs/lanyard/latestMusicListened";

export async function GET() {
  if (!getLanyardWebSocketStatus()) {
    console.log("Iniciando conexão WebSocket para Lanyard...");
    initializeLanyardWebSocket();
  } else {
    console.log("Conexão WebSocket Lanyard já ativa. Ignorando nova conexão.");
  }

  return new Response(JSON.stringify({ status: "ok", message: "Lanyard WebSocket handler initiated." }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}