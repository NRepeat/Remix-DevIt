import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { clsx } from "clsx";
interface BreadcrumbsProps {
  breadcrumbs: { label: string; link: string }[];
  admin: boolean
}

function Breadcrumbs({ breadcrumbs ,admin }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {index > 0 && <span className={clsx (styles.separator,{[styles.adminSeparator]:admin})}>/</span>}
          {breadcrumb.link && index+1 < breadcrumbs.length? (
            <Link className={clsx (styles.link,{[styles.adminLink]:admin})} to={breadcrumb.link}>{breadcrumb.label}</Link>
          ) : (
            <span className={clsx (styles.last,{[styles.adminLast]:admin})}>{breadcrumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
