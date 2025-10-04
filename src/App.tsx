import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Navbar } from './components';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PageNotFound from "./pages/PageNotFound";
import { useLocation } from "react-router-dom";
import { getUser } from "./api/graphql";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try{
      await getUser();
        } catch (error) {
      console.error(error);
      }
    };
    fetchData();
  }, []);

  const location = useLocation();
  const isBlogPost = location.pathname.startsWith("/blog/") && location.pathname !== "/blog/";
  return (
    <>
      {!isBlogPost ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/*" element={<BlogPost />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
