import { Link } from "@remix-run/react";
import {FC} from "react"
import styles from "./styles.module.css";

const Sidebar:FC = () => {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        <li>
          <Link  to={"customers"}>Customers</Link>
        </li>
        <li>
          <Link to={"products"}> Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
