import type { SerializeFrom } from "@remix-run/node";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  admin: boolean;
}

const Pagination: React.FC<SerializeFrom<PaginationProps>> = ({
  currentPage,
  totalPages,
  admin,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const [pages, setPages] = useState<number[]>([]);
  const submit = useSubmit();

  const handleSubmit = (page: number) => {
    if (sort!) {
      submit({ page, sort });
    } else {
      submit({ page });
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
    <div className={clsx(styles.pag, { [styles.disable]: totalPages! <= 1 })}>
      {pages.map((page) => (
        <button
          key={page}
          className={clsx(styles.button, {
            [styles.currentPage]: currentPage === page,
            [styles.adminButton]: admin,
            [styles.adminCurrentPage]: currentPage === page && admin,
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
