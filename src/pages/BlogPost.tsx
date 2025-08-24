import { Fragment, type JSX, useEffect, useState } from "react";
import { getPostBySlug } from "../api/graphql";
import { useLocation } from "react-router-dom";
import { Loader, Image } from "../components";
import type { Post as PostType } from "../types";
import '../styles/Blog.css';

const BlogPost = () : JSX.Element => {
  const location = useLocation();
useEffect(() => {
    const fetchData = async () => {
      try { 
      const paths = location?.pathname?.split("/") || [];
      const slug = paths[paths.length - 1];
      const res = await getPostBySlug({ slug });
      setPost(res as PostType);
      } catch (error) {
      console.error(error);
    }
    };
    fetchData();
  }, [location]);

  const [post, setPost] = useState<PostType>({} as PostType);

  return (
    <Fragment>
      {(Object.keys(post).length > 0) ? 
      (<div>
        {post?.coverImage?.url ? 
        <Image
          className="cover-img"
          src={post?.coverImage?.url}
          center
          alt={post?.title}
        /> : null}
        <h1>{post?.title}</h1>
        <p className="subtitle">{post?.subtitle}</p>
      <div dangerouslySetInnerHTML={{ __html: post?.content?.html }} />
      </div>) 
      : <Loader />}
    </Fragment>
  )
};

export default BlogPost;
