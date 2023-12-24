import type { FC } from "react";
import React from "react";
import AdminHeader from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import type { Member } from "~/services/member.server";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

type AdminPageLayoutProps = {
  children: React.ReactNode;
  member: Member;
};

const AdminPageLayout: FC<AdminPageLayoutProps> = ({ children, member }) => {
  return (
    <section className={styles.adminGrid}>
      <AdminHeader member={member} />
      <Sidebar />
      {children}
      <Footer />
    </section>
  );
};

export default AdminPageLayout;
