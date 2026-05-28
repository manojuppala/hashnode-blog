import { Fragment, type JSX, useEffect } from "react";
import { BlogCard, SeriesCard, Loader } from "../components";
import { getPublication } from "../api/graphql";
import { useAppStore } from "../store";
import { Link } from "react-router-dom";
import '../styles/Home.css';
import '../styles/Blog.css';

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

  const posts = useAppStore((state) => state.homePosts);
  const homeSeriesList = useAppStore((state) => state.homeSeriesList);
  const loading = useAppStore((state) => state.loading);
  return (
    <Fragment>
      {loading ? <Loader /> :
      <>
        <div>
          <h2 className="mb-3">Recent Blogs</h2>
          <div className="card-deck-blog">
            {posts.map((post, id) => {
              return <BlogCard key={id} {...post} withImage />;
            })}
          </div>
          <div className="text-center mt-2">
            <Link
              to="/blog"
              className="btn btn-primary btn-sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              View all blogs
            </Link>
          </div>
        </div>
        {homeSeriesList && homeSeriesList.length > 0 && (
          <div>
            <h2 className="mb-3">Blog Series</h2>
            <div className="card-deck-blog">
              {homeSeriesList.map((series, id) => {
                return <SeriesCard key={id} {...series} />;
              })}
            </div>
            <div className="text-center mt-2">
              <Link
                to="/series"
                className="btn btn-primary btn-sm"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                View all series
              </Link>
            </div>
          </div>
        )}
        {/* <Newsletter /> */}
      </>}
    </Fragment>
  );
};

export default Home;
