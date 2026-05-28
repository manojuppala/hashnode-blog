import { type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from 'moment';
import { Badge } from "./atoms";
import type { Post as PostType } from "../types";
import '../styles/BlogCard.css';

interface BlogCardProps extends PostType {
  seriesSlug?: string;
}

const BlogCard = (props: BlogCardProps): JSX.Element => {
  const { title, brief, coverImage: { url:coverImg } = {}, publishedAt, readTimeInMinutes, tags, slug, withImage = false, seriesSlug } = props;
  const formattedDate = moment(publishedAt).format('MMM D, YYYY');
  const location = useLocation();
  const currentNav = location?.pathname?.split("/")[1];

  // If seriesSlug is provided, link to series context
  const toLink = seriesSlug
    ? `/series/${seriesSlug}/${slug}`
    : (currentNav === "blog") ? slug : `blog/${slug}`;

  return (
      <div className={`card text-white bg-dark mb-3 ${withImage ? "cards-fixed-width2" : "cards-fixed-width"} card-border anchor-div`}>
        {withImage ?
        <Link to={toLink} className="plain-link">
          <div>
            <img className="card-img-top" src={coverImg} alt="Card cap" />
          </div> 
        </Link>: null}
        <div className="card-body">
        <Link to={toLink} className="plain-link">
          <h5 className="card-title text-primary">
            <b>{title}</b>
          </h5>
          <p className="card-text text-color">
            {brief}{" "}
            <span className="text-primary" style={{ cursor: "pointer" }}>
              Read more
            </span>
          </p>
        </Link>
          <div className="d-flex justify-content-between align-items-center">
          <Link to={toLink} className="plain-link">
            <small className="text-muted">{formattedDate} • {readTimeInMinutes} min read</small>
          </Link>
            <div>
              {tags?.map(({ name }, id) => {
                return <Badge key={id} text={name} />;
              })}
            </div>
          </div>
        </div>
      </div>
  );
};

export default BlogCard;
