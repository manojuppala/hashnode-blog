import type { ReactNode } from "react";

const AlertWarning = ({
  text,
  hideClose = false
}: {
  text: ReactNode;
  hideClose?: boolean;
}) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
        {text}
        {!hideClose ? 
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> : null}
      </div>
  );
};

export default AlertWarning;
