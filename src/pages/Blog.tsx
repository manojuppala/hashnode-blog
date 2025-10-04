import { Fragment, type JSX, useEffect } from "react";
import { Searchbar, Pagination, BlogCard, Loader } from '../components';
import { getPublication } from "../api/graphql";
import { useAppStore } from "../store";
import '../styles/Blog.css';

const postsPerPage = 10;

const Blog = (): JSX.Element => {
  const posts  = useAppStore((state) => state.blogPosts);
  const loading  = useAppStore((state) => state.loading);
  const clearSearchTerm  = useAppStore((state) => state.clearSearchTerm);

  useEffect(() => {
      const fetchData = async () => {
        try{
        await getPublication({ count: postsPerPage, page: 1 });
        } catch (error) {
        console.error(error);
      }
      };
      fetchData();
    }, []);

  useEffect(() => {
    return () => {  
      clearSearchTerm();
    };
  }, [clearSearchTerm]);

  return (
    <Fragment>
      <Searchbar postsPerPage={postsPerPage}/>
      {loading ? <Loader /> :
      (<>
        {posts && !posts.length ? 
        <div className="container text-center">
          <p className="text-color">No posts found with the search term.</p>
        </div> : 
          <div className="card-deck card-deck-flex">
            {posts.map((post, id) => {
              return <BlogCard key={id} {...post} />;
            })}
          </div>
        }
        <Pagination postsPerPage={postsPerPage} />
    </>)}
    </Fragment>
  )
};

export default Blog;
