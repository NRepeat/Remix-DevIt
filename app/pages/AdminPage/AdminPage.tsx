import { Outlet } from "@remix-run/react";
import type { FC } from "react";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Header from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import Footer from "~/components/Footer/Footer";

// const links = [{ slug: "dashboard", name: "Dashboard" }, { slug: "crud", name: "CRUD" }]

const AdminPage: FC = () => {
  return (
    <>
      <PageLayout isAdmin={true}>
        <Header>
          <div style={{ minWidth: "200px", display: "flex", gap: "30px" }}>
            <div>svg </div>
            <h1> Label</h1>
          </div>

          <section>
            {" "}
            <div>svg </div> <div>svg </div> Profile section
          </section>
        </Header>
        <Outlet />

        <Sidebar />
        <Footer />
      </PageLayout>
    </>
  );
};

export default AdminPage;
