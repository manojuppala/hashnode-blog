import { getPublication } from "../api/graphql";
import debounce from "lodash/debounce"
import { useAppStore } from "../store";

const Searchbar = ({ postsPerPage = 10 }:{ postsPerPage: number }) => {
  const  searchTerm  = useAppStore((state) => state.searchTerm);
  const  updateSearchTerm  = useAppStore((state) => state.updateSearchTerm);
  const  clearSearchTerm  = useAppStore((state) => state.clearSearchTerm);
  const debouncedSearch = debounce(async() => {
    await getPublication({ count: postsPerPage, page: 1 });
  }, 1500);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark searchbar">
      <div className="input-group col-md-5 mx-auto">
        <input
          className="form-control text-light bg-dark input-query"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            const searchTerm = e.target.value;
              updateSearchTerm(searchTerm);
              debouncedSearch();
          }}
          value={searchTerm}
        />
        {searchTerm ? 
        <button type="button" className="btn bg-transparent clear-btn" onClick={async() => {
          clearSearchTerm();
          await getPublication({ count: postsPerPage, page: 1 });
          }}>
          <i className="fa fa-times"></i>
        </button> : null}
        <span className="input-group-append">
          <button type="button" className="btn btn-primary" onClick={debouncedSearch}>
            <i className="fa fa-search"></i>
          </button>
        </span>
      </div>
    </nav>
  );
};

export default Searchbar;
