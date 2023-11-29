import { Link, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [pages, setPages] = useState<number[]>([]);
  const submit = useSubmit();
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
        <Link
          className={styles.button}
          onClick={() => {
            submit({
              page: page || 1,
              sort: "asc",
            });
          }}
          to={`/products?page=${page}`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};
export default Pagination;
