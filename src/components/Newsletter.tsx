import { subscribeToNewsletter }  from "../api/graphql";
import { useAppStore } from "../store";
import ButtonLoading from "./ButtonLoading";

const Newsletter = () => {
  const status = useAppStore((state) => state.newsletterStatus);
  const errorMsg = useAppStore((state) => state.newsletterErrorMsg);
  const loading = useAppStore((state) => state.newsletterLoading);
  const clearNewsletterInfo = useAppStore((state) => state.clearNewsletterInfo);
  const validClass = (status === "ERROR") ? "is-invalid" : ((status === "PENDING") ? "is-valid" : "");
  return (
    <div className="container text-center">
        <h2 className="mb-3">Subscribe to our newsletter</h2>
        <p className="text-color">
          Read articles from Manoj's Blog directly inside your inbox. Subscribe to the newsletter, and don't miss out.
        </p>
          <div className="d-flex justify-content-center">
            <div className="input-group col-md-5">
              <input
                name="newsletter-input"
                type="text"
                className={`form-control text-light bg-dark input-query rounded-right ${validClass}`}
                placeholder="Enter your email address"
                aria-label="newsletter"
                onChange={clearNewsletterInfo}
              />
              <div className="valid-feedback">
                We've sent a confirmation email;
                <br/>
                click on the link to complete your subscription to this newsletter.
              </div>
              <div className="invalid-feedback">
                {errorMsg}
              </div>
            </div>
            <ButtonLoading text="Subscribe" loading={loading} disabled={loading} className="subscribe-btn"
            onClick={async () => {
              const email = (document.querySelector('.input-query') as HTMLInputElement)?.value;
              if (email.trim()) {
                await subscribeToNewsletter({ email });
              }
            }}/>
          </div>
      </div>
  );
};

export default Newsletter;
