import { Link } from "@remix-run/react";








export default function () {

  return (
    <>Landing page <Link to={"/products"}>products</Link> </>
  );
}