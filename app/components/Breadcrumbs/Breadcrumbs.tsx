import { Link } from "@remix-run/react";
import styles from "./styles.module.css";

interface BreadcrumbsProps {
  breadcrumbs: { label: string; link: string }[];
}

function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {breadcrumb.link && index+1 < breadcrumbs.length? (
            <Link className={styles.link} to={breadcrumb.link}>{breadcrumb.label}</Link>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumbs;
