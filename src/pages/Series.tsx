import { Fragment, type JSX, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogCard, Loader, Pagination, Breadcrumb, Image } from '../components';
import { getSeries } from "../api/graphql";
import { useAppStore } from "../store";
import '../styles/Blog.css';

const postsPerPage = 10;

const Series = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const seriesDetail = useAppStore((state) => state.seriesDetail);
  const loading = useAppStore((state) => state.loading);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        await getSeries({ slug, count: postsPerPage, page: 1 });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [slug]);

  if (!seriesDetail && !loading) {
    return (
      <div className="container text-center">
        <p className="text-color">Series not found.</p>
      </div>
    );
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <>
          {seriesDetail && (
            <>
              <Breadcrumb items={[
                { label: 'Home', path: '/' },
                { label: 'Series', path: '/series' },
                { label: seriesDetail.name }
              ]} />

              {seriesDetail.coverImage && (
                <Image
                  className="cover-img"
                  src={seriesDetail.coverImage}
                  center
                  alt={seriesDetail.name}
                />
              )}

              <div className="mb-4">
                {seriesDetail.description?.html && (
                  <div
                    className="text-color mt-3 text-center"
                    dangerouslySetInnerHTML={{ __html: seriesDetail.description.html }}
                  />
                )}
              </div>

              <h2 className="mb-3">Posts in this series</h2>
              
              {seriesDetail.posts && seriesDetail.posts.length > 0 ? (
                <>
                  <div className="card-deck-blog">
                    {seriesDetail.posts.map((post, id) => (
                      <BlogCard key={id} {...post} withImage seriesSlug={slug} />
                    ))}
                  </div>
                  <Pagination 
                    itemsPerPage={postsPerPage} 
                    type="seriesPosts" 
                    seriesSlug={slug} 
                  />
                </>
              ) : (
                <div className="container text-center">
                  <p className="text-color">No posts in this series yet.</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Fragment>
  );
};

export default Series;
