import { useAppStore } from '../store';
import { getPublication } from "../api/graphql";

const getPages = (
  totalPosts: number, 
  currentPage: number, 
  hasNextPage: boolean,
  postsPerPage: number): number[] => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if(currentPage === 1) {
    return [1, ...(hasNextPage ? [2] : []), ...(totalPages > 2 ? [3] : [])];
  } else if((currentPage > 1) && !hasNextPage) {
    return [(currentPage - 2), (currentPage - 1), currentPage].filter(page => page > 0);
  } 
  return [...(currentPage > 1)?[currentPage - 1]:[], currentPage, ...(hasNextPage)?[currentPage + 1]:[]]
}

const Pagination = ({ postsPerPage=10 }:{ postsPerPage: number }) => {
  const  pagination  = useAppStore((state) => state.pagination);
  const { totalPosts, currentPage, hasNextPage } = pagination;
  const pagesArr = getPages(totalPosts, currentPage, hasNextPage, postsPerPage);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${(currentPage === 1) ? 'disabled' : ''}`} 
        onClick={async() => {
          if(currentPage !== 1) {
            await getPublication({ count: postsPerPage, page: (currentPage - 1) });
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
          await getPublication({ count: postsPerPage, page });
        }}>
          <a className={`page-link ${isCurrentPage ? '': 'bg-dark'}`} href="#">
            {page} {isCurrentPage ? <span className="sr-only">(current)</span> : null}
          </a>
        </li>);
        })}
        <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`} 
        onClick={async() => {
          if(hasNextPage){
          await getPublication({ count: postsPerPage, page: (currentPage + 1) });
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
