import type { SearchResult } from "@/types/book";
import Link from "next/link";

interface SearchBookItemProps {
  result: SearchResult;
  onSelect?: () => void;
}

export function SearchBookItem({ result, onSelect }: SearchBookItemProps) {
  const imageUrl = result.image?.startsWith("/") ? `https://inventaire.io${result.image}` : result.image;

  return (
    <Link href={`/books/${encodeURIComponent(result.uri)}`} onClick={onSelect}>
      <div className="hstack gap-4">
        {imageUrl && <img src={imageUrl} alt={result.label} width={40} height={60} />}
        <div className="vstack">
          <div className="font-bold">{result.label}</div>
          <div className="text-text-secondary">{result.description}</div>
        </div>
      </div>
    </Link>
  );
}
