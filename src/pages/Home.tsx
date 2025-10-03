import { Fragment, type JSX, useEffect } from "react";
import { BlogCard, Loader, Newsletter } from "../components";
import { getPublication } from "../api/graphql";
import { useAppStore } from "../store";
import logo from "../assets/mario.png";
import '../styles/Home.css';

const Home = (): JSX.Element => {

  useEffect(() => {
      const fetchData = async () => {
        try{
        await getPublication({ count: 2 });
        } catch (error) {
        console.error(error);
      }
      };
      fetchData();
    }, []);

  const  posts  = useAppStore((state) => state.homePosts);
  const  loading  = useAppStore((state) => state.loading);

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
      {loading ? <Loader /> :
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
      </>}
    </Fragment>
  );
};

export default Home;
