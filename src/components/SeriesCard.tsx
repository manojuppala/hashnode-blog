import { type JSX } from "react";
import { Link } from "react-router-dom";
import type { Series as SeriesType } from "../types";
import '../styles/BlogCard.css';

const SeriesCard = (props: SeriesType): JSX.Element => {
  const { name, slug, description, coverImage } = props;

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
          {description?.html && (
            <div className="card-text text-color series-description">
              <div dangerouslySetInnerHTML={{ __html: description.html + ' ' }} />
              <span className="text-primary" style={{ cursor: "pointer" }}>
                View series
              </span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SeriesCard;
