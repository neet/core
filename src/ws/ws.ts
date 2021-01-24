export interface WsEvents {
  readonly disconnect: () => void;
  readonly on: (name: string, cb: () => void) => void;
}

export interface Ws {
  stream(path: string, params: unknown): WsEvents;
}
