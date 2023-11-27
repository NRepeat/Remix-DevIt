import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const tempPages = [];
    for (let i = 1; i <= totalPages; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
  }, [totalPages]);

  return (
    <div className={styles.pag}>
      {pages.map((page) => (
        <button
          className={styles.button}
          key={page}
          disabled={currentPage === page}
        >
          <Link className={styles.link} to={`/?page=${page}`}>
            {page}
          </Link>
        </button>
      ))}
    </div>
  );
};
export default Pagination;
