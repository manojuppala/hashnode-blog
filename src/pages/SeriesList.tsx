import { Fragment, type JSX, useEffect } from "react";
import { SeriesCard, Loader, Pagination, Breadcrumb } from '../components';
import { getSeriesList } from "../api/graphql";
import { useAppStore } from "../store";
import '../styles/Blog.css';

const seriesPerPage = 10;

const SeriesList = (): JSX.Element => {
  const seriesList = useAppStore((state) => state.seriesList);
  const loading = useAppStore((state) => state.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSeriesList({ count: seriesPerPage, page: 1 });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Breadcrumb items={[
        { label: 'Home', path: '/' },
        { label: 'Series' }
      ]} />
      {loading ? <Loader /> : (
        <>
          {seriesList && !seriesList.length ?
            <div className="container text-center">
              <p className="text-color">No series found.</p>
            </div> :
            <div className="card-deck-blog">
              {seriesList.map((series, id) => {
                return <SeriesCard key={id} {...series} />;
              })}
            </div>
          }
          <Pagination itemsPerPage={seriesPerPage} type="series" />
        </>
      )}
    </Fragment>
  )
};

export default SeriesList;
