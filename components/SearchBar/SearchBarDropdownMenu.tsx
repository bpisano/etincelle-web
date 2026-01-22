import type { SearchEntity } from "@/types/search";
import { SearchBarDropdownItem } from "./SearchBarDropdownItem";
import { SearchBookItem } from "./SearchBookItem";

interface SearchBarDropdownMenuProps {
  books: SearchEntity[];
  isLoading: boolean;
  error: string | null;
  selectedIndex: number;
  query: string;
  onItemHover: (index: number) => void;
  onItemSelect: () => void;
}

export function SearchBarDropdownMenu({
  books,
  isLoading,
  error,
  selectedIndex,
  query,
  onItemHover,
  onItemSelect,
}: SearchBarDropdownMenuProps) {
  return (
    <div className="absolute top-full left-0 right-0 bg-bgd-secondary border border-t-0 border-border-primary z-10">
      {error && <div className="p-4">Error: {error}</div>}

      {!error && books.length === 0 && !isLoading && <div className="p-4">No books found</div>}

      {!error && books.length > 0 && (
        <div className="vstack">
          {books.map((result, index) => (
            <SearchBarDropdownItem
              key={result.uri}
              isSelected={index === selectedIndex}
              onHover={() => onItemHover(index)}
            >
              <SearchBookItem result={result} onSelect={onItemSelect} />
            </SearchBarDropdownItem>
          ))}
          <div className="pt-2">
            <a href={`/search?q=${encodeURIComponent(query)}`}>View more results</a>
          </div>
        </div>
      )}

      {isLoading && books.length === 0 && <div className="p-4">Searching...</div>}
    </div>
  );
}
