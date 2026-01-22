"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearSearch,
  decrementSelectedIndex,
  incrementSelectedIndex,
  performSearch,
  setIsOpen,
  setQuery,
  setSelectedIndex,
} from "@/store/slices/searchSlice";
import { useCallback, useEffect, useRef } from "react";
import { SearchBarDropdownMenu } from "./SearchBarDropdownMenu";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const { query, results, isOpen, isLoading, error, selectedIndex } = useAppSelector((state) => state.search);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      dispatch(clearSearch());
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(performSearch(query));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dispatch(setIsOpen(false));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(setIsOpen(false));
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isOpen && results.length > 0) {
          dispatch(incrementSelectedIndex());
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isOpen && results.length > 0) {
          dispatch(decrementSelectedIndex());
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (isOpen && results.length > 0 && results[selectedIndex]) {
          window.location.href = `/books/${encodeURIComponent(results[selectedIndex].uri)}`;
        }
      }
    },
    [isOpen, results, selectedIndex, dispatch],
  );

  // Handle focus to show dropdown if there are results
  const handleFocus = useCallback(() => {
    if (query.trim().length >= 2 && results.length > 0) {
      dispatch(setSelectedIndex(0));
      dispatch(setIsOpen(true));
    }
  }, [query, results.length, dispatch]);

  return (
    <div className="w-full max-w-2xl relative" ref={dropdownRef}>
      <input
        className={`bg-bgd-secondary w-full placeholder:text-text-tertiary text-text-primary border-border-primary border outline-none px-2 py-1`}
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Search..."
      />

      {isOpen && (
        <SearchBarDropdownMenu
          books={results}
          isLoading={isLoading}
          error={error}
          selectedIndex={selectedIndex}
          query={query}
          onItemHover={(index) => dispatch(setSelectedIndex(index))}
          onItemSelect={() => dispatch(setIsOpen(false))}
        />
      )}
    </div>
  );
}
