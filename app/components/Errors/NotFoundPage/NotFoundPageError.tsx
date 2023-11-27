import styles from "./styles.module.css";
import { Link, useNavigate } from "@remix-run/react";


function NotFoundPageError() {
  const navigate = useNavigate();

  return (
    <div className={styles.errorNotFoundPage}>
      <h2>Page not found</h2>
      <Link to="/">Go to main page</Link>
      or
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default NotFoundPageError;
