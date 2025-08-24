import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "highlight.js/styles/github-dark-dimmed.css";
import hljs from "highlight.js";
import { Footer, Navbar } from './components';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

function App() {
    const location = useLocation();
    useEffect(() => {
    hljs.highlightAll();
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/*" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
