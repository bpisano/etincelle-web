export enum SearchEntityType {
  Works = "works",
  Humans = "humans",
  Genres = "genres",
  Publishers = "publishers",
  Series = "series",
  Collections = "collections",
  Movements = "movements",
}

export interface SearchEntity {
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
  results: SearchEntity[];
  total: number;
  continue?: number;
}
