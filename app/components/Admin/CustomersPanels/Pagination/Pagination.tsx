import { useSearchParams, useSubmit } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { SerializeFrom } from "@remix-run/node";
interface PaginationProps {
  currentPage: number;
  totalPages: number ;
}
import { clsx } from "clsx";
import styles from "./styles.module.css";


const Pagination: React.FC<SerializeFrom<PaginationProps>> = ({
  currentPage,
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className={styles.pag}>
      {pages.map((page) => (
        <button
          key={page}
          className={clsx(styles.button, {
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
