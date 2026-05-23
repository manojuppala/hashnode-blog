import { Fragment, type JSX } from "react";
import { useAppStore } from "../store";
import { Loader } from "../components";

const About = (): JSX.Element => {
  const user = useAppStore((state) => state.user);
  const loading = useAppStore((state) => state.loading);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          {user?.profilePicture ?
          <div className="logo">
                <img src={user?.profilePicture} className="logo" alt="logo" />
          </div> : null}
          {user?.bio?.text ?
          <div className="text-center">
            <p className="text-color">
              {user?.bio?.text}
            </p>
          </div> : null}
        </>
      )}
    </Fragment>
  );
};

export default About;
