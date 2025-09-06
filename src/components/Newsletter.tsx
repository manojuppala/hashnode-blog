const Newsletter = () => {
  return (
    <div className="container text-center">
        <h2 className="mb-3">Subscribe to our newsletter</h2>
        <p className="text-color">
          Read articles from Manoj's Blog directly inside your inbox. Subscribe to the newsletter, and don't miss out.
        </p>
          <div className="d-flex justify-content-center">
            <div className="input-group col-md-5">
              <input
                className="form-control text-light bg-dark input-query"
                placeholder="Enter your email address"
                aria-label="newsletter"
              />
            </div>
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </div>
      </div>
  );
};

export default Newsletter;
