import { Link } from "@remix-run/react";
import styles from "./styles.module.css";




export interface Filtr {
  categories: [];
}

const Filtr = ({ categories }: Filtr) => {
  return (
    <nav className={styles.list}>
      <ul className={styles.ul}>
        {categories.map((category,i) => {
          return (
            <li className={styles.li} key={i}>
              <Link className={styles.link} to={`/search?c=${category}`}>{category}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Filtr;
