import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import resetStylesHref from "./styles/reset.css";
import globalStylesHref from "./styles/global.css";
import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import NotFoundPageError from "./components/Errors/NotFoundPage/NotFoundPageError";
import { createCart } from "./services/cart.server";
import { getSession } from "./services/session.server";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStylesHref },
  { rel: "stylesheet", href: globalStylesHref },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  return json({cart:cart.items()})
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
        <NotFoundPageError />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="body">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
