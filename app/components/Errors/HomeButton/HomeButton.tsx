import { Link, useNavigate } from '@remix-run/react'
import styles from "../styles.module.css";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/">RETURN TO THE MAIN PAGE</Link>
      <button className={styles.backB} onClick={() => navigate(-1)}>
        RETURN TO PREVIOUS PAGE
      </button>
    </div>
  )
}

export default HomeButton