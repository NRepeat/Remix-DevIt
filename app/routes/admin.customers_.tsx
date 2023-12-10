import { Outlet } from "@remix-run/react";
import CRUDPanel from "~/components/Admin/CRUD/CRUDPanel";

export default function () {
  return (
    <>
      <CRUDPanel>
        <Outlet />
      </CRUDPanel>
    </>
  );
}
