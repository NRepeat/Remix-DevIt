import { Form } from "@remix-run/react";
import rootStylesHref from "../styles/rootIndex.css";
import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesHref },
];

export default function () {
  return (
    <div className="rootIndexContainer">
      <h1>Welcome to Store</h1>
      <p>Find everything you need in our e-commerce store</p>
      <Form action="/products/sync" method="post">
        <button className="link" type="submit">
          SHOP NOW
        </button>
      </Form>
    </div>
  );
}
