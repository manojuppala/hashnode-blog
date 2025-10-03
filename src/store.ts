import { create } from 'zustand';
import type { Post as PostType } from './types';

type State = {
  publicationId: string;
  newsletterStatus: string;
  newsletterErrorMsg: string;
  loading: boolean;
  pagination: {
    totalPosts: number;
    currentPage: number;
    cursor: Record<string, string>;
    hasNextPage: boolean;
  };
  blogPosts: PostType[];
  homePosts: PostType[];
  searchTerm: string;
};

type Actions = {
  updatePublicationId: (id: string) => void;
  updateNewsletterInfo: (status: string, errorMsg: string) => void;
  updateSearchTerm: (searchTerm: string) => void;
  clearSearchTerm: () => void;
};

export const useAppStore = create<State & Actions>((set) => ({
  publicationId: '',
  newsletterStatus: '',
  newsletterErrorMsg: '',
  loading: false,
  pagination: {
    totalPosts: 0,
    currentPage: 1,
    hasNextPage: false,
    cursor: {}
  },
  blogPosts: [],
  homePosts: [],
  searchTerm: '',
  updateSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
  clearSearchTerm: () => set(() => ({ searchTerm: '' })),
  updatePublicationId: (id: string) => set(() => ({ publicationId: id })),
  updateNewsletterInfo: (status: string, errorMsg: string) =>
    set(() => ({ newsletterStatus: status, newsletterErrorMsg: errorMsg }))
}));
