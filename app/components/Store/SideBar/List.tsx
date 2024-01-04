import { Link, type Location } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./styles.module.css";

export interface ListProps {
  links: {
    slug: string;
    name: string;
    path: string
  }[];
  navigation: Location;
}

const List: FC<ListProps> = ({
  links,
  navigation,
}) => {
  console.log("🚀 ~ file: List.tsx:19 ~ navigation:", navigation.pathname === links[0].path)

  return (
    <>

      <ul
        className={clsx(styles.list)}
      >
        {links.map((link, i) => (
          <li
            key={i}
            className={clsx(styles.li)}
          >

            <Link
              to={`${link.path}`}
              className={styles.link}
            >
              <p className={clsx(styles.label, {
                [styles.active]: navigation.pathname ===
                  `${link.path}`
                ,
              })}>{link.name} </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
