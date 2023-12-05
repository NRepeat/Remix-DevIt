import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import adminStylesHref from "../styles/admin.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {}

export default function () {
  return (
    <div className="adminPage">
      <Header />
      <main className="adminMain">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}
