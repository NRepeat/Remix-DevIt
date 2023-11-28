import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { FC } from "react";
import { Category } from "@prisma/client";


export interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: FC<CategoriesListProps> = ({ categories }) => {
  return (
    <nav className={styles.list}>
      <ul className={styles.ul}>
        {categories.map((category, i) => {
          return (
            <li className={styles.li} key={i}>
              <Link
                className={styles.link}
                to={`/products/category/${category.slug}`}
              >
                {category.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriesList;
