import { Link } from "@remix-run/react";
import type { FC } from "react";
import React from "react";
import styles from "../styles.module.css";
type Props = {
  children: React.ReactNode;
  link: string;
};

const CRUDCard: FC<Props> = ({ children, link }) => {
  return (
    <Link className={styles.card} to={link}>
      {children}
    </Link>
  );
};

export default CRUDCard;
