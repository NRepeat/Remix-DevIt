import { Outlet } from "@remix-run/react";
import CRUDPanel from "~/Layout/AdminMainLayout/MainLayout";

export default function () {
  return (
    <CRUDPanel>
      <Outlet />
    </CRUDPanel>
  );
}
