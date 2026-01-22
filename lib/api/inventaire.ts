import type { InventaireSearchResponse, SearchEntity } from "@/types/search";
import { SearchEntityType } from "@/types/search";

export async function searchBooks(query: string, limit: number = 10): Promise<SearchEntity[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      search: query.trim(),
      limit: limit.toString(),
      "min-score": "100000",
    });

    // Add all entity types
    Object.values(SearchEntityType).forEach((type) => {
      params.append("types", type);
    });

    const response = await fetch(`/api/search?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: InventaireSearchResponse = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error searching books:", error);
    throw new Error("Failed to search books. Please try again.");
  }
}
