import { create } from "zustand";

type SearchState = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
