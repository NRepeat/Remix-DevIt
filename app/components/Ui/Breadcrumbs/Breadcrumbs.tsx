import { Link } from "@remix-run/react";
import type { FC } from "react";
import styles from "./styles.module.css";
interface BreadcrumbsProps {
  breadcrumbs: { label: string; link?: string }[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const errorBreadcrumbs = [
    { label: "Buy", link: "/" },
    { label: "Something", link: "/" },
    { label: "Else", link: "/" },
  ];
  return (
    <>
      {breadcrumbs ? (
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index}>
              {breadcrumb.link && (
                <>
                  {index > 0 && <span className={styles.separator}>/</span>}
                  <Link className={styles.link} to={breadcrumb.link}>
                    {breadcrumb.label}
                  </Link>
                </>
              )}
              {!breadcrumb.link && (
                <>
                  <span className={styles.separator}>/</span>
                  <span className={styles.last}>{breadcrumb.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.breadcrumbs}>
          {errorBreadcrumbs.map((breadcrumb, index) => (
            <div key={index}>
              {breadcrumb.link && (
                <>
                  {index > 0 && <span className={styles.separator}>/</span>}
                  <Link className={styles.link} to={breadcrumb.link}>
                    {breadcrumb.label}
                  </Link>
                </>
              )}
              {!breadcrumb.link && (
                <>
                  <span className={styles.separator}>/</span>
                  <span className={styles.last}>{breadcrumb.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
