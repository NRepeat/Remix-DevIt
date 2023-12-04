import { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Header from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import NotFoundPageError from "~/components/Errors/NotFoundPage/NotFoundPageError";
import GlobalLoader from "~/components/GlobalLoading/GlobalLoader";
import adminStylesHref from "../styles/admin.css";
import AdminError from "~/components/Errors/AdminError/AdminError";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <AdminError error={error} />
  }

}

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
