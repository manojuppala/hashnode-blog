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

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const data = await response.json();

  // Filter out forks and sort by stars
  const filteredRepos = data
    .filter((repo: GitHubRepo) => !repo.fork)
    .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);

  return filteredRepos;
};
