import AdminPanel from "~/components/Admin/AdminPanel/AdminPanel";

import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel";

const AdminPage: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {
  return <AdminPanel data={data} />;
};

export default AdminPage;
