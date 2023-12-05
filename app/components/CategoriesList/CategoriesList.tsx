import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import type { FC } from "react";
import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";


export interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: FC<SerializeFrom<CategoriesListProps>> = ({ categories }) => {
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
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoriesList;
