import type { InventaireIORequest } from "./types";
import { InventaireIOError } from "./types";

export class InventaireIOClient {
  private baseURL: string;
  private userAgent: string;

  constructor(baseURL: string = "https://inventaire.io/api", userAgent: string = "Etincelle-Web/1.0") {
    this.baseURL = baseURL;
    this.userAgent = userAgent;
  }

  async execute<TResponse>(request: InventaireIORequest<TResponse>): Promise<TResponse> {
    try {
      const params = request.buildParams();
      const url = `${this.baseURL}/${request.endpoint}?${params.toString()}`;

      const response = await fetch(url, {
        method: request.method,
        headers: {
          "User-Agent": this.userAgent,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new InventaireIOError(`API request failed: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      return request.parseResponse(data);
    } catch (error) {
      if (error instanceof InventaireIOError) {
        throw error;
      }

      throw new InventaireIOError("Failed to execute request", undefined, error);
    }
  }
}

export const inventaireClient = new InventaireIOClient("/api");
export const inventaireServerClient = new InventaireIOClient(
  "https://inventaire.io/api",
  "Etincelle-Web/1.0 (https://github.com/etincelle)",
);
