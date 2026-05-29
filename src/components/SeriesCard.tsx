import { type JSX } from "react";
import { Link } from "react-router-dom";
import type { Series as SeriesType } from "../types";
import '../styles/BlogCard.css';

const MAX_DESCRIPTION_LENGTH = 300;

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

const SeriesCard = (props: SeriesType): JSX.Element => {
  const { name, slug, description, coverImage } = props;
  const truncatedDescription = description?.markdown
    ? truncateText(description.markdown, MAX_DESCRIPTION_LENGTH)
    : '';

  return (
    <div className="card text-white bg-dark mb-3 cards-fixed-width2 card-border anchor-div">
      {coverImage && (
        <Link to={`/series/${slug}`} className="plain-link">
          <div>
            <img className="card-img-top" src={coverImage} alt={name} />
          </div>
        </Link>
      )}
      <div className="card-body">
        <Link to={`/series/${slug}`} className="plain-link">
          <h5 className="card-title text-primary">
            <b>{name}</b>
          </h5>
          {truncatedDescription && (
            <p className="card-text text-color">
              {truncatedDescription}{" "}
              <span className="text-primary" style={{ cursor: "pointer" }}>
                View series
              </span>
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SeriesCard;
