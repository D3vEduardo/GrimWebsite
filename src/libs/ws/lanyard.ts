import { LanyardData } from "@type/lanyardTypes";

enum Op {
  Event,
  Hello,
  Initialize,
  Heartbeat,
}

enum LanyardEvent {
  INIT_STATE = "INIT_STATE",
  PRESENCE_UPDATE = "PRESENCE_UPDATE",
}

interface SocketData extends Partial<LanyardData> {
  heartbeat_interval?: number;
}

interface SocketMessage {
  op: Op;
  t?: LanyardEvent;
  d?: SocketData;
}

type EventCallback<T> = (data: T) => void;

interface EventMap {
  [LanyardEvent.INIT_STATE]: LanyardData;
  [LanyardEvent.PRESENCE_UPDATE]: LanyardData;
  presence: LanyardData; // Evento emitido pela classe Lanyard
  close: { code: number; reason: string }; // Adicionado evento de fechamento
  error: Event; // Adicionado evento de erro
}

class CustomEventEmitter<M extends Record<string, any>> {
  private events: Partial<{ [K in keyof M]: EventCallback<M[K]>[] }> = {};

  on<K extends keyof M>(event: K, callback: EventCallback<M[K]>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(callback);
  }

  off<K extends keyof M>(event: K, callback: EventCallback<M[K]>): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event]!.filter((cb) => cb !== callback);
  }

  emit<K extends keyof M>(event: K, data: M[K]): void {
    if (!this.events[event]) return;
    this.events[event]!.forEach((callback) => callback(data));
  }
}

export class Lanyard extends CustomEventEmitter<EventMap> {
  private ws: WebSocket;
  private heartbeat: NodeJS.Timeout | null = null;
  private user_id: string;
  private last_presence: LanyardData | undefined;

  constructor(user_id: string) {
    super();
    this.user_id = user_id;
    this.ws = new WebSocket("wss://api.lanyard.rest/socket");

    this.ws.addEventListener("open", () => this.subscribe());
    this.ws.addEventListener("message", (e) =>
      this.handleMessage(JSON.parse(e.data))
    );
    this.ws.addEventListener("close", (event) => this.handleClose(event));
    this.ws.addEventListener("error", (event) => this.handleError(event));
  }

  private send(op: Op, d?: any): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ op, d }));
    }
  }

  private subscribe(): void {
    this.send(Op.Initialize, { subscribe_to_id: this.user_id });
  }

  private handleMessage(data: SocketMessage): void {
    switch (data.op) {
      case Op.Hello:
        if (data.d?.heartbeat_interval) {
          this.heartbeat = setInterval(
            () => this.send(Op.Heartbeat),
            data.d.heartbeat_interval
          );
        }
        break;
      case Op.Event:
        if (
          data.t === LanyardEvent.INIT_STATE ||
          data.t === LanyardEvent.PRESENCE_UPDATE
        ) {
          this.last_presence = data.d as LanyardData;
          this.emit("presence", this.last_presence);
        }
        break;
      default:
        break;
    }
  }

  private cleanup(): void {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
  }

  private handleClose(event?: CloseEvent): void {
    this.cleanup();
    const code = event?.code || 1000;
    const reason = event?.reason || "Unknown reason";
    console.log(`WebSocket desconectado. Código: ${code}, Razão: ${reason}. Tentando reconectar em 5 segundos...`);
    this.emit("close", { code, reason });
    setTimeout(() => this.reconnect(), 5000);
  }

  private handleError(event: Event): void {
    console.error("Erro no WebSocket:", event);
    this.cleanup();
    this.emit("error", event);
    console.log("Erro no WebSocket. Tentando reconectar em 5 segundos...");
    setTimeout(() => this.reconnect(), 5000);
  }

  private reconnect(): void {
    this.ws = new WebSocket("wss://api.lanyard.rest/socket");
    this.ws.addEventListener("open", () => this.subscribe());
    this.ws.addEventListener("message", (e) =>
      this.handleMessage(JSON.parse(e.data))
    );
    this.ws.addEventListener("close", (event) => this.handleClose(event));
    this.ws.addEventListener("error", (event) => this.handleError(event));
  }

  requestPresenceUpdate(): void {
    if (this.last_presence) {
      this.emit("presence", this.last_presence);
    }
  }

  isAlive(): boolean {
    return this.ws.readyState === WebSocket.OPEN;
  }
}
