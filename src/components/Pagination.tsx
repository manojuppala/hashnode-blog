import { useAppStore } from '../store';
import { getPublication, getSeriesList, getSeries } from "../api/graphql";

const getPages = (
  totalItems: number,
  currentPage: number,
  hasNextPage: boolean,
  itemsPerPage: number): number[] => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if(currentPage === 1) {
    return [1, ...(hasNextPage ? [2] : []), ...(totalPages > 2 ? [3] : [])];
  } else if((currentPage > 1) && !hasNextPage) {
    return [(currentPage - 2), (currentPage - 1), currentPage].filter(page => page > 0);
  }
  return [...(currentPage > 1)?[currentPage - 1]:[], currentPage, ...(hasNextPage)?[currentPage + 1]:[]]
}

type PaginationType = 'posts' | 'series' | 'seriesPosts';

interface PaginationProps {
  itemsPerPage?: number;
  type?: PaginationType;
  seriesSlug?: string; // Required when type is 'seriesPosts'
}

const Pagination = ({ itemsPerPage = 10, type = 'posts', seriesSlug }: PaginationProps) => {
  const postsPagination = useAppStore((state) => state.pagination);
  const seriesPagination = useAppStore((state) => state.seriesPagination);
  const seriesPostsPagination = useAppStore((state) => state.seriesPostsPagination);

  const pagination = type === 'posts' ? postsPagination : type === 'series' ? seriesPagination : seriesPostsPagination;
  const totalItems = type === 'posts' ? postsPagination.totalPosts : type === 'series' ? seriesPagination.totalSeries : seriesPostsPagination.totalPosts;
  const { currentPage, hasNextPage } = pagination;
  const pagesArr = getPages(totalItems, currentPage, hasNextPage, itemsPerPage);

  const fetchFunction = type === 'posts' ? getPublication : type === 'series' ? getSeriesList : getSeries;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${(currentPage === 1) ? 'disabled' : ''}`}
        onClick={async() => {
          if(currentPage !== 1) {
            if (type === 'seriesPosts' && seriesSlug) {
              await (fetchFunction as typeof getSeries)({ slug: seriesSlug, count: itemsPerPage, page: (currentPage - 1) });
            } else {
              await (fetchFunction as typeof getPublication)({ count: itemsPerPage, page: (currentPage - 1) });
            }
          }
        }}>
          <a className="page-link bg-dark" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pagesArr.map((page, key) => {
          const isCurrentPage = (+page === +currentPage);
          return (
          <li key={key} className={`page-item ${isCurrentPage ? 'active' : ''}`}
          onClick={async() => {
            if (type === 'seriesPosts' && seriesSlug) {
              await (fetchFunction as typeof getSeries)({ slug: seriesSlug, count: itemsPerPage, page });
            } else {
              await (fetchFunction as typeof getPublication)({ count: itemsPerPage, page });
            }
        }}>
          <a className={`page-link ${isCurrentPage ? '': 'bg-dark'}`} href="#">
            {page} {isCurrentPage ? <span className="sr-only">(current)</span> : null}
          </a>
        </li>);
        })}
        <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}
        onClick={async() => {
          if(hasNextPage){
            if (type === 'seriesPosts' && seriesSlug) {
              await (fetchFunction as typeof getSeries)({ slug: seriesSlug, count: itemsPerPage, page: (currentPage + 1) });
            } else {
              await (fetchFunction as typeof getPublication)({ count: itemsPerPage, page: (currentPage + 1) });
            }
        }
        }}>
          <a className="page-link bg-dark"  href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
