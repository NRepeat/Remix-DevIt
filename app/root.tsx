import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import NotFoundPageError from "./components/Errors/NotFoundPage/NotFoundPageError";
import GlobalLoader from "./components/GlobalLoading/GlobalLoader";
import { createCart } from "./services/cartSession.server";
import { getSession } from "./services/session.server";
import globalStylesHref from "./styles/global.css";
import resetStylesHref from "./styles/reset.css";

export const links: LinksFunction = () => [

  { rel: "stylesheet", href: resetStylesHref },
  { rel: "stylesheet", href: globalStylesHref },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  return json({ cart: cart.items() });
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bodyError">
        <GlobalLoader isAdmin={false} />
        <NotFoundPageError />
      </body>
    </html>
  );
}

export default function App() {
  const nav = useLocation();
  let isAdmin = true;
  nav.pathname.includes("/admin") ? (isAdmin = true) : (isAdmin = false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="body">
        <GlobalLoader isAdmin={isAdmin} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
