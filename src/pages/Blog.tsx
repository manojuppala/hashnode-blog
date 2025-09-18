import { Fragment, type JSX, useEffect, useState } from "react";
import { Searchbar, Pagination, BlogCard, Loader } from '../components';
import { getPublication } from "../api/graphql";
import type { Post as PostType } from "../types";
import '../styles/Blog.css';

const Blog = (): JSX.Element => {
useEffect(() => {
    const fetchData = async () => {
      try{
      const posts = await getPublication({ count: 10 });
      setPosts((posts ?? []) as PostType[]);
      } catch (error) {
      console.error(error);
    }
    };
    fetchData();
  }, []);

  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <Fragment>
      <Searchbar/>
      {posts.length ? 
      (<div className="card-deck card-deck-flex">
        {posts.map((post, id) => {
          return <BlogCard key={id} {...post} />;
        })}
      </div>) : <Loader />}
      <Pagination />
    </Fragment>
  )
};

export default Blog;
