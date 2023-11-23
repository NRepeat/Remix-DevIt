import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, LoaderFunctionArgs, type LinksFunction } from "@remix-run/node";
import Header from "./components/Header/Header";
import { getSession } from "./services/session.server";
import { createCart } from "./services/cart.server";
import style from "./style.module.css";
import GloabalLoader from "./components/GlobalLoading/GlobalLoading";
import Sidebar from "./components/SideBar/Sidebar";
import { getAllProductCategories } from "./services/product.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = createCart(session);
  const cat = await getAllProductCategories();
  return json({ cart: cart.items(), cat });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={style.body}>
        <GloabalLoader />
        <Header />
        <div className={style.container}>
          <aside className={style.sidebar}>
            <Sidebar />
          </aside>
          <div className={style.mainWrapper}>
            <main className={style.main}>
              <Outlet />
            </main>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
