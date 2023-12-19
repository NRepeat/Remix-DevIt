import {
  Link,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import styles from "./styles.module.css";

const AdminError = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.error}>
        <div className={styles.wrapper}>
          <h1>{error.status}</h1>
          {error.statusText && <p>{error.statusText}</p>}
          {error.data && <p>{error.data}</p>}
          <div>
            <Link to={"/admin"}>RETURN TO MAIN PAGE</Link>
            <button className={styles.backB} onClick={() => navigate(-1)}>
              RETURN TO PREVIOUS PAGE
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default AdminError;
