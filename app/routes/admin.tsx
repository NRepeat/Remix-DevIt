import { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet } from "@remix-run/react";
import Header from "~/components/Admin/Header/Header";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import NotFoundPageError from "~/components/Errors/NotFoundPage/NotFoundPageError";
import GlobalLoader from "~/components/GlobalLoading/GlobalLoader";
import adminStylesHref from "../styles/admin.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref},
];


export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Admin oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bodyError">
        <GlobalLoader />
        <NotFoundPageError />
      </body>
    </html>
  );
}

export default function () {
  return (
    <div className="adminPage">
      <Header/>
      <main className="adminMain">
      <Sidebar />
      <Outlet />

      </main>
   
    </div>
  );
}