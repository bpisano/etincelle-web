"use client";

import { searchBooks } from "@/lib/api/inventaire";
import type { SearchResult } from "@/types/book";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchBarDropdownMenu } from "./SearchBarDropdownMenu";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setBooks([]);
      setIsOpen(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchBooks(query, 7);
        setBooks(results);
        setSelectedIndex(0);
        setIsOpen(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to search");
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isOpen && books.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % books.length);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isOpen && books.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + books.length) % books.length);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (isOpen && books.length > 0 && books[selectedIndex]) {
          window.location.href = `/books/${encodeURIComponent(books[selectedIndex].uri)}`;
        }
      }
    },
    [isOpen, books, selectedIndex]
  );

  // Handle focus to show dropdown if there are results
  const handleFocus = useCallback(() => {
    if (query.trim().length >= 2 && books.length > 0) {
      setSelectedIndex(0);
      setIsOpen(true);
    }
  }, [query, books.length]);

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      <input
        className={`bg-bgd-secondary w-full placeholder:text-text-tertiary text-text-primary border-border-primary border outline-none px-2 py-1`}
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Search..."
      />

      {isOpen && (
        <SearchBarDropdownMenu
          books={books}
          isLoading={isLoading}
          error={error}
          selectedIndex={selectedIndex}
          query={query}
          onItemHover={setSelectedIndex}
          onItemSelect={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
