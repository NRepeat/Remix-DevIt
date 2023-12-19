import { Link, type Location } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./styles.module.css";

export interface ListProps {
  links: {
    label: string;
    url: string;
    slug: string;
  }[];
  navigation: Location;
  isHamburger: boolean;
  isOpen: boolean;
  toggle: (nextValue?: any) => void;
}

const List: FC<ListProps> = ({
  links,
  navigation,
  isHamburger,
  isOpen,
  toggle,
}) => {
  return (
    <>
      {isOpen && (
        <ul
          className={clsx(styles.list, { [styles.isHamburger]: isHamburger })}
        >
          {links.map((link, i) => (
            <li
              key={i}
              className={clsx(styles.link, {
                [styles.active]: navigation.pathname.startsWith(
                  `/products/categories/${link.slug}`
                ),
              })}
            >
              <Link
                to={`/products/categories/${link.slug}`}
                className={styles.button}
                onClick={() => {
                  toggle(false);
                }}
              >
                <p className={styles.label}>{link.label} </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
