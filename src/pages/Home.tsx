import { Fragment, type JSX, useEffect, useState } from "react";
import { BlogCard, Loader } from "../components";
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
      {posts.length ? <div className="card-deck">
        {posts.map((post, id) => {
          return <BlogCard key={id} {...post} withImage />;
        })}
      </div> : <Loader />}
      <div>
        <p className="text-color">
          Read articles from Manoj's Blog directly inside your inbox. Subscribe to the newsletter, and don't miss out.
        </p>
      </div>
      {/* <p className="h5 text-primary" id="about">
        About
      </p>
      <p className="text-color">
        Hi there i'm Manoj Uppala. A frontend engineer and an aspiring fullstack developer. An Open
        Source enthusiast with interests in web dev and data science. I constantly find ways to
        challenge myself, learn new things and experiment with different tools.
      </p>
      <Code
        snippet={`things = ["good thing","bad thing","nothing"]
hope = "good thing"
if(hope == bestof(things)):
  print('no good thing ever dies')
# by stephen king`}
        lang="python"
      /> */}
    </Fragment>
  );
};

export default Home;
