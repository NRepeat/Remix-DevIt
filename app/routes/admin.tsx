import { Links, Meta, Outlet } from "@remix-run/react";
import Sidebar from "~/components/Admin/Sidebar/Sidebar";
import NotFoundPageError from "~/components/Errors/NotFoundPage/NotFoundPageError";
import GlobalLoader from "~/components/GlobalLoading/GlobalLoader";



export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
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
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}