import type { InventaireSearchResponse, SearchResult } from "@/types/book";

export async function searchBooks(query: string, limit: number = 10): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      search: query.trim(),
      types: "works",
      limit: limit.toString(),
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
