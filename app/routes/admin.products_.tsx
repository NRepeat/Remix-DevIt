import { Outlet } from "@remix-run/react";
import CRUDPanel from "~/components/Admin/MainLayout/MainLayout";

export default function () {
  return (
    <>
      <CRUDPanel>
        <Outlet />
      </CRUDPanel>
    </>
  );
}
