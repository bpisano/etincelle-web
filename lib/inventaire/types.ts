export interface InventaireIORequest<TResponse> {
  endpoint: string;
  method: 'GET' | 'POST';
  buildParams(): URLSearchParams;
  parseResponse(data: unknown): TResponse;
}

export class InventaireIOError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'InventaireIOError';
  }
}
