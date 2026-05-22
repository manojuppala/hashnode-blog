import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentNav = location?.pathname?.split("/")[1];
  const [navState, setNavState] = useState(currentNav || "home");
  

  const sections = ["Home", "Blog", "OpenSource"];

  const activeClass = "nav-item active text-center px-2nav-item text-center px-2";
  const inActiveClass = "nav-item text-center px-2nav-item text-center px-2";
  return (
    <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark" id="navbarCollapsible">
      <button
        className="navbar-toggler btn"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav mx-auto">
          {sections?.map((nav, id) => {
            const lowercase = nav.toLowerCase();
            return (
              <li key={id} className={navState === lowercase ? activeClass : inActiveClass}>
                <Link
                  className="nav-link h5"
                  to={lowercase === "home" ? "/" : `/${lowercase}`}
                  onClick={() => setNavState(lowercase)}
                >
                  {nav}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
