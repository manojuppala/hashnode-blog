import { Fragment, type JSX, useEffect, useState } from "react";
import { getPostBySlug } from "../api/graphql";
import { Link, useLocation } from "react-router-dom";
import { Loader, Image, FormattedHTML, Newsletter } from "../components";
import { Badge } from "../components/atoms";
import type { Post as PostType } from "../types";
import moment from 'moment';
import '../styles/Blog.css';

const BlogPost = (): JSX.Element => {
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

  const { publishedAt, readTimeInMinutes, coverImage, title, subtitle, author, tags } = post;
  const formattedDate = moment(publishedAt).format('MMM D, YYYY');
  const contentHtml = post?.content?.html;
  return (
    <Fragment>
      <title>{title}</title>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/blog"}>
              Blog
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      {(Object.keys(post).length > 0) ? 
      (<div>
        {coverImage?.url ? 
        <Image
          className="cover-img"
          src={coverImage?.url}
          center
          alt={title}
        /> : null}
        <div className="container text-center">
        <p className="blog-meta mt-2"><a href="">{author?.name}</a> • {formattedDate} • {readTimeInMinutes} min read</p>
      </div>
        <div>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
      <FormattedHTML htmlString={contentHtml} />
      <div className="container text-center text-light">
        Tags: {tags?.map(({ name }, id) => {
          return <Badge key={id} text={name} />;
        })}
      </div>
      </div>) 
      : <Loader />}
      <Newsletter />
    </Fragment>
  )
};

export default BlogPost;
