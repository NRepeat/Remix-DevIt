import { Outlet } from "@remix-run/react";
import MainLayout from "~/Layout/AdminMainLayout/MainLayout";

export default function () {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
