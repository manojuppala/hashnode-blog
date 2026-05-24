import { Fragment, type JSX, useEffect, useState } from "react";
import { Loader, RepoSort, Badge } from "../components";
import { getGithubRepos } from "../api/github";
import { getLanguageColorClass } from "../utils/languageColors";
import { useAppStore } from "../store";
import '../styles/Blog.css';
import '../styles/OpenSource.css';

const OpenSource = (): JSX.Element => {
  const repos = useAppStore((state) => state.githubRepos);
  const loading = useAppStore((state) => state.githubLoading);
  const error = useAppStore((state) => state.githubError);
  const sortOption = useAppStore((state) => state.repoSortOption);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const moreAvailable = await getGithubRepos(4, sortOption);
        setHasMore(moreAvailable);
      } catch (err) {
        console.error('Failed to fetch GitHub repos:', err);
      }
    };

    loadRepos();
  }, [sortOption]);

  const handleLoadMore = async () => {
    const currentCount = repos.length;
    const moreAvailable = await getGithubRepos(currentCount + 4, sortOption);
    setHasMore(moreAvailable);
  };

  return (
    <Fragment>
      <div className="text-center">
        <p className="text-color mb-4">
          Here are some of my open source projects on GitHub. Feel free to check them out, star them, or contribute!
        </p>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="container text-center">
          <p className="text-danger">
            Error: {error}
            <br />
            <a href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}>Visit {`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}</a>
          </p>
        </div>
      ) : repos.length === 0 ? (
        <div className="container text-center">
          <p className="text-color">No repositories found.</p>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <RepoSort />
          </div>
          <div className="row">
            {repos.map((repo) => (
            <div key={repo.id} className="col-md-6 mb-3">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-card-link h-100 d-block">
                <div className="card text-white bg-dark h-100 card-border">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <svg className="repo-icon mr-2" viewBox="0 0 16 16">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                      </svg>
                      <h5 className="card-title text-primary mb-0 repo-title">
                        {repo.name}
                      </h5>
                      <span className="repo-badge-public ml-2">Public</span>
                    </div>

                    <p className="card-text text-color mb-3 repo-description">
                      {repo.description || "No description available"}
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex align-items-center justify-content-between flex-wrap repo-meta">
                        <div className="d-flex align-items-center flex-wrap">
                          {repo.language && (
                            <span className="mr-3 d-flex align-items-center">
                              <span className={`repo-lang-dot d-inline-block mr-1 ${getLanguageColorClass(repo.language)}`}></span>
                              <span className="text-muted">{repo.language}</span>
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span className="mr-3 d-flex align-items-center text-muted">
                              <svg className="repo-icon-small mr-1" viewBox="0 0 16 16">
                                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                              </svg>
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="d-flex align-items-center text-muted">
                              <svg className="repo-icon-small mr-1" viewBox="0 0 16 16">
                                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                              </svg>
                              {repo.forks_count}
                            </span>
                          )}
                        </div>
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="d-flex align-items-center flex-wrap">
                            {repo.topics.slice(0, 3).map((topic, index) => (
                              <Badge key={index} text={topic} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          </div>

          {hasMore && (
            <div className="text-center mt-2">
              {loading ? (
                <Loader />
              ) : (
                <button
                  className="show-more-btn"
                  onClick={handleLoadMore}
                >
                  Show more
                </button>
              )}
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default OpenSource;
