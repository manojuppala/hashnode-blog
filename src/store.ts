import { create } from 'zustand';
import type { Post as PostType } from './types';

type State = {
  publicationId: string;
  newsletterStatus: string;
  newsletterErrorMsg: string;
  newsletterLoading: boolean;
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
  user: {
    id?: string;
    username?: string;
    profilePicture?: string;
    bio?: {
      text?: string;
    };
    socialMediaLinks?: {
      website?: string;
      github?: string;
      stackoverflow?: string;
      linkedin?: string;
      youtube?: string;
    };
  };
};

type Actions = {
  updatePublicationId: (id: string) => void;
  updateNewsletterInfo: (status: string, errorMsg: string) => void;
  updateSearchTerm: (searchTerm: string) => void;
  clearSearchTerm: () => void;
  clearNewsletterInfo: () => void;
};

export const useAppStore = create<State & Actions>((set) => ({
  publicationId: '',
  newsletterStatus: '',
  newsletterErrorMsg: '',
  newsletterLoading: false,
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
  user: {},
  updateSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
  clearSearchTerm: () => set(() => ({ searchTerm: '' })),
  updatePublicationId: (id: string) => set(() => ({ publicationId: id })),
  updateNewsletterInfo: (status: string, errorMsg: string) =>
    set(() => ({ newsletterStatus: status, newsletterErrorMsg: errorMsg })),
  clearNewsletterInfo: () => set(() => ({ newsletterStatus: '', newsletterErrorMsg: '' }))
}));
