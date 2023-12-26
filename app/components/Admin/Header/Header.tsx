import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { Member } from "~/services/member.server";
import styles from "./styles.module.css";

type AdminHeaderProps = {
  member: Member | undefined;
};

const AdminHeader: FC<AdminHeaderProps> = ({ member }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        <p>Admin Panel</p>
      </h1>
      <div>
        <Link to={"/admin"}>
          <img src="" alt="avatar" />
        </Link>
        <p>Name</p>
        {member && <p>{member.email}</p>}
      </div>
    </div>
  );
};

export default AdminHeader;
