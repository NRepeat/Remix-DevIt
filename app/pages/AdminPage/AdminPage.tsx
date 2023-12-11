import { Outlet } from "@remix-run/react";
import type { FC } from "react";
import Header from "~/Header/Header";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import Footer from "~/components/Footer/Footer";
import styles from "./styles.module.css";
// const links = [{ slug: "dashboard", name: "Dashboard" }, { slug: "crud", name: "CRUD" }]

const AdminPage: FC = () => {
  return (
    <>
      <PageLayout isAdmin={true}>
        <Header>
          <h1 className={styles.headerInfo}>Admin penal</h1>
        </Header>
        <Outlet />

        <Sidebar />
        <Footer />
      </PageLayout>
    </>
  );
};

export default AdminPage;
