import { Link, useSubmit } from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";
import { LinksFunction, defer } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

export default function () {
  return (
    <div className="rootIndexContainer">
      <h1>Welcome to Store</h1>
      <p>Find everything you need in our e-commerce store</p>
      <Link className="link" to={"/products"}>
        SHOP NOW
      </Link>
    </div>
  );
}
