import type { GitHubRepo } from '../api/github';

export const sortRepos = (
  repos: GitHubRepo[],
  sortOption: 'updated' | 'name' | 'stars'
): GitHubRepo[] => {
  const reposCopy = [...repos];

  switch (sortOption) {
    case 'updated':
      return reposCopy.sort((a, b) => 
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    
    case 'name':
      return reposCopy.sort((a, b) => 
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    
    case 'stars':
      return reposCopy.sort((a, b) => 
        b.stargazers_count - a.stargazers_count
      );
    
    default:
      return reposCopy;
  }
};
