import type { LinksFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import AdminPage from "~/Pages/AdminPage/AdminPage";
import HomeButton from "~/components/Errors/HomeButton/HomeButton";
import adminStylesHref from "../styles/adminStylesHref.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminStylesHref },
];

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        {error.statusText && <p>{error.statusText}</p>}
        {error.data && <p>{error.data}</p>}
        <HomeButton />
      </div>
    );
  }
}

export default function () {
  return (
    <div className="bg-admin-index">
      <AdminPage />
    </div>
  );
}
