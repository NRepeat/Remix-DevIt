import { LinksFunction } from "@remix-run/node";
import {
  Outlet,
} from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";
import GlobalLoader from "~/components/GlobalLoading/GlobalLoader";
import Header from "~/components/Header/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];



function Home() {


  return (
    <div className="container">
      <GlobalLoader />
      <Header />
      <Outlet />
    </div>
  );
}

export default Home;
