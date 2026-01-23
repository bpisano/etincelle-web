import { inventaireServerClient } from "@/lib/inventaire/client";
import { SearchRequest } from "@/lib/inventaire/requests/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");
  const types = searchParams.getAll("types");
  const limit = searchParams.get("limit");
  const lang = searchParams.get("lang");

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  try {
    const searchRequest = new SearchRequest({
      query,
      limit: limit ? parseInt(limit, 10) : undefined,
      lang: lang || undefined,
      types: types.length > 0 ? (types as any) : undefined,
    });

    const results = await inventaireServerClient.execute(searchRequest);

    return NextResponse.json({ results, total: results.length });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
