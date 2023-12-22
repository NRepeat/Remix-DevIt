import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { Member } from "~/services/member.server";

type AdminHeaderProps = {
  member: Member | undefined;
};

const AdminHeader: FC<AdminHeaderProps> = ({ member }) => {
  return (
    <div>
      {" "}
      <h1>Admin Panel</h1>
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
