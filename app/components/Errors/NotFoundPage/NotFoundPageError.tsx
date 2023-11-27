import styles from "./styles.module.css";
import { Link, useNavigate } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

function NotFoundPageError() {
  const navigate = useNavigate();
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorNotFoundPage}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <Link to="/">Go to main page</Link>
        or
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.errorNotFoundPage}>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
        <Link to="/">Go to main page</Link>
        or
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.errorNotFoundPage}>
          <h1>Unknown Error</h1>
          <h2 className="">Page not found</h2>
          <Link to="/">Go to main page</Link>
          or
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </>
    );
  }
  return (
    <div className={styles.errorNotFoundPage}>
      <h2 className="">Page not found</h2>
      <Link to="/">Go to main page</Link>
      or
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default NotFoundPageError;
