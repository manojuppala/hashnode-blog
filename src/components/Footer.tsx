import { Link } from "./atoms";

const Footer = () => {
  const socials = {
      github: "https://github.com/manojuppala",
      linkedin: "https://linkedin.com/in/manojuppala/",
      youtube: "https://www.youtube.com/@manojuppala",
      "stack-overflow": "https://stackoverflow.com/users/11874811/manoj"
    };

  return (
    <footer className="footer">
      <div className="footer-copyright text-center text-secondary py-3">
        {Object.keys(socials).length !== 0 ? (
          <div className="container text-center">
            {Object.keys(socials).map((social, id) => {
              return (
                <Link
                  href={socials[social as keyof typeof socials]}
                  key={id}
                  className="h5 pr-3 text-secondary"
                >
                  <i className={`fa fa-${social} fa-social`}></i>
                </Link>
              );
            })}
          </div>
        ) : null}
          <span className="text-muted meta-data">
            {" "}
            © {new Date().getFullYear()} Copyright: <a href="https://manojuppala.com">manojuppala.com</a>
          </span>
      </div>
    </footer>
  );
};

export default Footer;
