import { create } from "zustand";

export type News = {
  id: string;
  title: string;
  content: string;
  categories: string[];
  createdAt: string;
  isFeatured?: boolean;
  updatedAt?: string;
};

type NewsState = {
  newsList: News[];
  setNewsList: (news: News[]) => void;
  getNewsById: (id: string) => News | undefined;
};

export const useNewsStore = create<NewsState>((set, get) => ({
  newsList: [],
  setNewsList: (news) => set({ newsList: news }),
  getNewsById: (id) => get().newsList.find((n) => n.id === id),
}));
