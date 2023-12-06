import type { Location } from "@remix-run/react";
import { useSubmit } from "@remix-run/react";
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
}

const List: FC<ListProps> = ({ links, navigation, isHamburger, isOpen }) => {
  const submit = useSubmit();
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
                [styles.active]: navigation.search.startsWith(
                  `?category=${link.slug}`
                ),
              })}
            >
              {/* <Link to={link.url}><p className={styles.label}>{link.label} </p></Link> */}
              <button
                className={styles.button}
                onClick={() =>
                  submit(
                    { category: link.slug },
                    { action: link.url, preventScrollReset: true }
                  )
                }
              >
                <p className={styles.label}>{link.label} </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
