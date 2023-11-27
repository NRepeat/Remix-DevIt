import HomeButton from "../HomeButton/HomeButton";
import styles from "../styles.module.css";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function NotFoundPageError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorNotFoundPage}>
        <h1 className={styles.heading}>
          {error.status} {error.statusText}
        </h1>
        <p className={styles.data}>{error.data}</p>
        <HomeButton/>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.errorNotFoundPage}>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
        <HomeButton/>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.errorNotFoundPage}>
          <h1>Unknown Error</h1>
          <h2 className="">Page not found</h2>
          <HomeButton/>
        </div>
      </>
    );
  }
}
