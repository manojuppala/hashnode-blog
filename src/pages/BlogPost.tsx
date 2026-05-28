import { Fragment, type JSX, useEffect, useState } from "react";
import { getPostBySlug } from "../api/graphql";
import { useLocation, useParams } from "react-router-dom";
import { Loader, Image, FormattedHTML, Breadcrumb } from "../components";
import PageNotFound from "./PageNotFound";
import { Badge } from "../components/atoms";
import type { Post as PostType } from "../types";
import { useAppStore } from "../store";
import moment from 'moment';
import '../styles/Blog.css';

const BlogPost = (): JSX.Element => {
  const location = useLocation();
  const { seriesSlug } = useParams<{ seriesSlug?: string }>();
  const seriesDetail = useAppStore((state) => state.seriesDetail);

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
  const  loading  = useAppStore((state) => state.loading);

  const { publishedAt, readTimeInMinutes, coverImage, title, subtitle, author, tags } = post || {};
  const userURL = author?.socialMediaLinks?.website || author?.socialMediaLinks?.github || "";
  const formattedDate = moment(publishedAt).format('MMM D, YYYY');
  const contentHtml = post?.content?.html;

  // Determine breadcrumb based on context
  const breadcrumbItems = seriesSlug && seriesDetail
    ? [
        { label: 'Home', path: '/' },
        { label: 'Series', path: '/series' },
        { label: seriesDetail.name, path: `/series/${seriesSlug}` },
        { label: title }
      ]
    : [
        { label: 'Blog', path: '/blog' },
        { label: title }
      ];

  const htmlToRender = (
  <>
  <Breadcrumb items={breadcrumbItems} />
    <div>
          {coverImage?.url ? 
          <Image
            className="cover-img"
            src={coverImage?.url}
            center
            alt={title}
          /> : null}
          <div className="container text-center">
          <p className="blog-meta mt-2"><a href={userURL} target="_blank" rel="noopener noreferrer">
            {author?.name}</a> • {formattedDate} • {readTimeInMinutes} min read
          </p>
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
    </div>
    {/* <Newsletter /> */}
  </>);

  return (
    <Fragment>
      <title>{title}</title>
      {post ? ((Object.keys(post).length > 0) && !loading ? (htmlToRender) : <Loader />) : <PageNotFound />}
    </Fragment>
  )
};

export default BlogPost;
