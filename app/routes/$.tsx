import { Form, useSubmit } from "@remix-run/react";
import { redirect } from "react-router";
import { Link } from "react-router-dom";

export function loader() {
  return new Response("Not Found", {
    status: 404,
  });
}



export default function NotFoundPage() {
  return <>
    Error 404

<Link to="/">Go to main page</Link>

  </>
}