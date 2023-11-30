import { Outlet } from "@remix-run/react";
import AdminPanel from "~/components/Admin/AdminPanel/AdminPanel";

export default function () {
  return (
    <div>
      <AdminPanel/>
      <Outlet/>
    </div>
  );
}