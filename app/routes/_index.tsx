import { Link } from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

export default function () {

  return (
    <> 
    <Link to={"/products"}>products</Link> 
    </>
  );
}