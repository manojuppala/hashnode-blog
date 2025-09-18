import { Fragment, type JSX } from "react";
import '../styles/index.css';

const PageNotFound = (): JSX.Element => {

  return (
    <Fragment>
      <title>Page Not Found</title>
    <div className="container text-center">
        <h1 style={{fontSize: '500%'}}>
            404
        </h1>
        <h1 style={{fontSize: '300%'}}>
            Page Not Found
        </h1>
    </div>
    </Fragment>
  );
};

export default PageNotFound;
