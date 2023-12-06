import type { Location } from "@remix-run/react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./styles.module.css";

export interface ListProps {
  links: {
    label: string;
    url: string;
  }[];
  navigation: Location;
  isHamburger: boolean;
  isOpen: boolean;
}

const List: FC<ListProps> = ({ links, navigation, isHamburger, isOpen }) => {
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
                [styles.active]: navigation.pathname.includes(`${link.url}`),
              })}
            >
              <Link to={link.url}>{link.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
