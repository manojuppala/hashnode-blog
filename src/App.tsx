import { Routes, Route } from "react-router-dom";
import { Footer, Navbar } from './components';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { useLocation } from "react-router-dom";


function App() {
  const location = useLocation();
  const isBlogPost = location.pathname.startsWith("/blog/") && location.pathname !== "/blog/";
  return (
    <>
      {!isBlogPost ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/*" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
