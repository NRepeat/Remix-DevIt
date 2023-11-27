import NotFoundPageError from "~/components/Errors/NotFoundPage/NotFoundPageError";


export function loader() {
  return new Response("Not Found", {
    status: 404,
  });
}

export default function NotFoundPage() {
  return (
  <NotFoundPageError/>
  );
}
