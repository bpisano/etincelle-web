export interface SearchResult {
  id: string;
  type: string;
  uri: string;
  label: string;
  description?: string;
  image?: string;
  claims?: Record<string, unknown>;
  _score: number;
  _popularity: number;
}

export interface InventaireSearchResponse {
  results: SearchResult[];
  total: number;
  continue?: number;
}
