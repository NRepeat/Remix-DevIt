import HomeButton from "../HomeButton/HomeButton";
import styles from "../styles.module.css";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export default function NotFoundPageError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorNotFound}>
        <h1 className={styles.heading}>{error.status}</h1>
        {error.statusText && (
          <p className={styles.status}>{error.statusText}</p>
        )}
        {error.data && <p className={styles.data}>{error.data}</p>}
        <HomeButton />
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.errorNotFound}>
        <h1 className={styles.heading}>Error</h1>
        <p>{error.message}</p>
        <HomeButton />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.errorNotFound}>
          <h1 className={styles.heading}>Unknown Error</h1>
          <h2 className="">Page not found</h2>
          <HomeButton />
        </div>
      </>
    );
  }
}
