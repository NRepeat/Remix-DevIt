import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import styles from "./styles.module.css";

const StoreRouteError = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <p className={styles.error}>
        {error.data} {error.status}
      </p>
    );
  }
};

export default StoreRouteError;
