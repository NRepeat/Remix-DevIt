import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

function Home() {
  return <Outlet />;
}

export default Home;
