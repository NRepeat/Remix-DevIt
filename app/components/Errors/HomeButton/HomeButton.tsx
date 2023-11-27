import { Link, useNavigate } from '@remix-run/react'
import styles from "../styles.module.css";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <div>  <Link className={styles.link} to="/">Go to main page</Link>
      <span>or</span>
      <button className={styles.backB} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}

export default HomeButton