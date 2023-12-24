import { Outlet } from "@remix-run/react";
import type { FC } from "react";
import Footer from "~/Layout/Footer/Footer";
import Header from "~/Layout/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
const AdminPage: FC = () => {
  return (
    <>
      <Header>
        <h1>Admin panel</h1>
      </Header>
      <Outlet />

      <Sidebar />
      <Footer />
    </>
  );
};

export default AdminPage;
