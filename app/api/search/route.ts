import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://inventaire.io/api";
const USER_AGENT = "Etincelle-Web/1.0 (https://github.com/etincelle)";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");
  const types = searchParams.get("types") || "works";
  const limit = searchParams.get("limit") || "10";

  if (!query) {
    return NextResponse.json({ error: "Missing search query" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({
      search: query,
      types,
      limit,
      lang: "fr",
    });

    const response = await fetch(`${API_BASE_URL}/search?${params}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching books:", error);
    return NextResponse.json({ error: "Failed to search books" }, { status: 500 });
  }
}
