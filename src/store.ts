import { create } from 'zustand';
import type { Post as PostType } from './types';
import type { GitHubRepo } from './api/github';

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
  githubRepos: GitHubRepo[];
  githubLoading: boolean;
  githubError: string;
  repoSortOption: 'updated' | 'name' | 'stars';
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
  setGithubRepos: (repos: GitHubRepo[]) => void;
  setGithubLoading: (loading: boolean) => void;
  setGithubError: (error: string) => void;
  setRepoSortOption: (option: 'updated' | 'name' | 'stars') => void;
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
  githubRepos: [],
  githubLoading: false,
  githubError: '',
  repoSortOption: 'updated',
  user: {},
  updateSearchTerm: (searchTerm: string) => set(() => ({ searchTerm })),
  clearSearchTerm: () => set(() => ({ searchTerm: '' })),
  updatePublicationId: (id: string) => set(() => ({ publicationId: id })),
  updateNewsletterInfo: (status: string, errorMsg: string) =>
    set(() => ({ newsletterStatus: status, newsletterErrorMsg: errorMsg })),
  clearNewsletterInfo: () => set(() => ({ newsletterStatus: '', newsletterErrorMsg: '' })),
  setGithubRepos: (repos: GitHubRepo[]) => set(() => ({ githubRepos: repos })),
  setGithubLoading: (loading: boolean) => set(() => ({ githubLoading: loading })),
  setGithubError: (error: string) => set(() => ({ githubError: error })),
  setRepoSortOption: (option: 'updated' | 'name' | 'stars') => set(() => ({ repoSortOption: option }))
}));
