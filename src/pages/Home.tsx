import { Fragment, type JSX, useEffect, useState } from "react";
import { BlogCard, Loader, Newsletter } from "../components";
import { getPublication } from "../api/graphql";
import type { Post as PostType } from "../types";
import logo from "../assets/mario.png";
import '../styles/Home.css';

const Home = (): JSX.Element => {

useEffect(() => {
    const fetchData = async () => {
      try{
      const posts = await getPublication({ count: 2 });
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
      <div className="logo">
            <img src={logo} className="logo" alt="manojuppala.com" />
      </div>
      <div className="text-center">
        <p className="text-color">
          Email: <a href="mailto:contact@manojuppala.com">contact@manojuppala.com</a>
        </p>
      </div>
      {posts.length ? 
      <>
        <div>
          <h2 className="mb-3">Recent Blogs</h2>
          <div className="card-deck">
            {posts.map((post, id) => {
              return <BlogCard key={id} {...post} withImage />;
            })}
          </div>
        </div>
        <Newsletter />
      </>
      : <Loader />}
    </Fragment>
  );
};

export default Home;
