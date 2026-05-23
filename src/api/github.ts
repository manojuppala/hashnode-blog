import { useAppStore } from '../store';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

// Cache to store all fetched repos
let allReposCache: GitHubRepo[] | null = null;

export const getAllReposFromCache = (): GitHubRepo[] | null => {
  return allReposCache;
};

export const getGithubRepos = async (
  count: number = 4,
  sortOption: 'updated' | 'name' | 'stars' = 'updated'
): Promise<boolean> => {
  const { setGithubRepos, setGithubLoading, setGithubError } = useAppStore.getState();
  const { sortRepos } = await import('../utils/sortRepos');

  try {
    setGithubLoading(true);
    setGithubError('');

    // Fetch all repos only once
    if (!allReposCache) {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const data = await response.json();

      // Filter out forks and cache
      allReposCache = data.filter((repo: GitHubRepo) => !repo.fork);
    }

    // Get the requested count from cache
    if (!allReposCache) {
      return false;
    }

    // Sort all cached repos
    const sorted = sortRepos(allReposCache, sortOption);

    // Get the requested number
    const reposToShow = sorted.slice(0, count);
    setGithubRepos(reposToShow);

    // Return true if there are more repos available
    return count < sorted.length;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'An error occurred';
    setGithubError(errorMsg);
    return false;
  } finally {
    setGithubLoading(false);
  }
};
