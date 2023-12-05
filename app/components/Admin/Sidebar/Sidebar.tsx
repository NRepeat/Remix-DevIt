import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./styles.module.css";

const Sidebar: FC = () => {
  const navigation = useLocation();
  const links = [
    { label: "Customers", url: "/admin/customers" },
    { label: "Products", url: "/admin/products" },
  ];
  return (
    <nav className={styles.gridSidebar}>
      <ul className={styles.list}>
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
    </nav>
  );
};

export default Sidebar;
