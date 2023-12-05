import type { LinksFunction } from "@remix-run/node";
import PageLayout from "~/Layout/PageLayout/PageLayout";
import Footer from "~/components/Admin/Footer/Footer";
import Header from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import AdminPage from "~/pages/AdminPage/AdminPage";
import adminStylesHref from "../styles/admin.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {}

export default function () {
  return (
    <div>
      <PageLayout>
        <Header />
        <Sidebar />
        <AdminPage />
        <Footer />
      </PageLayout>
    </div>
  );
}
