import { Link } from "@remix-run/react";
import { clsx } from "clsx";
import styles from "./styles.module.css";
interface BreadcrumbsProps {
  breadcrumbs: { label: string; link: string }[];
  admin: boolean;
}

function Breadcrumbs({ breadcrumbs, admin }: BreadcrumbsProps) {
  return (
    <div
      className={clsx(styles.breadcrumbs, { [styles.adminGridArea]: admin })}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {index > 0 && (
            <span
              className={clsx(styles.separator, {
                [styles.adminSeparator]: admin,
              })}
            >
              /
            </span>
          )}
          {breadcrumb.link && index + 1 < breadcrumbs.length ? (
            <Link
              className={clsx(styles.link, { [styles.adminLink]: admin })}
              to={breadcrumb.link}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className={clsx(styles.last, { [styles.adminLast]: admin })}>
              {breadcrumb.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
