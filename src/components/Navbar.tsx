import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentNav = location?.pathname?.split("/")[1];
  const [navState, setNavState] = useState(currentNav || "home");

  // Update navState when location changes
  useEffect(() => {
    setNavState(currentNav || "home");
  }, [currentNav]);

  const sections = [
    { label: "Home", path: "home" },
    { label: "Blog", path: "blog" },
    { label: "Open-source", path: "opensource" },
    { label: "About", path: "about" }
  ];

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
            return (
              <li key={id} className={navState === nav.path ? activeClass : inActiveClass}>
                <Link
                  className="nav-link h5"
                  to={nav.path === "home" ? "/" : `/${nav.path}`}
                  onClick={() => setNavState(nav.path)}
                >
                  {nav.label}
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
