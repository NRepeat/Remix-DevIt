import { Link, useLocation, useNavigate, useParams, useSearchParams } from "@remix-run/react";
import styles from "./styles.module.css";
import { FC } from "react";




export interface CategoriesListProps{
  categories: string[];
}

const CategoriesList:FC<CategoriesListProps> = ({ categories }) => {
  return (
    <nav className={styles.list}>
      <ul className={styles.ul}>
        {categories.map((category,i) => {
          return (
            <li className={styles.li} key={i}>
              <Link className={styles.link} to={`/products/categories/${category}`}>{category}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriesList;
