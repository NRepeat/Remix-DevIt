import { Outlet } from "@remix-run/react";
import MainLayout from "~/components/Admin/MainLayout/MainLayout";



export default function () {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
