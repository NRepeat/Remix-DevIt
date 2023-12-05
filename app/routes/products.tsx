import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";
import Header from "~/components/Header/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
