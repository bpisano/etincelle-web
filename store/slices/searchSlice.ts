import { inventaireClient } from "@/lib/inventaire/client";
import { SearchRequest } from "@/lib/inventaire/requests/search";
import type { SearchEntity } from "@/types/search";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
  results: SearchEntity[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  selectedIndex: number;
}

const initialState: SearchState = {
  query: "",
  results: [],
  isOpen: false,
  isLoading: false,
  error: null,
  selectedIndex: 0,
};

export const performSearch = createAsyncThunk("search/performSearch", async (query: string) => {
  if (query.trim().length < 2) {
    return [];
  }

  const request = new SearchRequest({
    query: query.trim(),
    limit: 7,
  });

  return await inventaireClient.execute(request);
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setSelectedIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    incrementSelectedIndex: (state) => {
      if (state.results.length > 0) {
        state.selectedIndex = (state.selectedIndex + 1) % state.results.length;
      }
    },
    decrementSelectedIndex: (state) => {
      if (state.results.length > 0) {
        state.selectedIndex = (state.selectedIndex - 1 + state.results.length) % state.results.length;
      }
    },
    clearSearch: (state) => {
      state.results = [];
      state.isOpen = false;
      state.error = null;
      state.selectedIndex = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
        state.selectedIndex = 0;
        state.isOpen = true;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to search";
        state.results = [];
      });
  },
});

export const { setQuery, setIsOpen, setSelectedIndex, incrementSelectedIndex, decrementSelectedIndex, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
