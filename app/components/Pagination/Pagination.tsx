import { Form, Link, useSearchParams, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import type { SerializeFrom } from "@remix-run/node";
import { clsx } from "clsx";
interface PaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  admin:boolean
}


const Pagination: React.FC<SerializeFrom<PaginationProps>> = ({
  currentPage,
  totalPages,
  admin
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const [pages, setPages] = useState<number[]>([]);
  const submit = useSubmit();

  const handleSubmit = (page: number) => {
    if (sort!) {
      submit({page,sort});
    } else {
      submit({page});
    }
  };

  useEffect(() => {
    const tempPages = [];
    for (let i = 1; i <= totalPages!; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
  }, [totalPages]);

  return (
    <div className={styles.pag}>
      {pages.map((page) => (
        <button
        key={page}
          className={clsx(styles.button, {
            [styles.adminCurrentPage]:admin,
            [styles.adminButton]:admin,
            [styles.currentPage]: currentPage === page,
          })}
          onClick={() => handleSubmit(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
