// import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import ProductsList from "~/components/ProductsList/ProductsList";
// // import { searchDbProduct } from "~/services/product.server";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const searchQuery = url.searchParams.get("search");
//   if (searchQuery === '') {
//     return redirect('/products');
//   }
//   // const products = await searchDbProduct(searchQuery!);
//   const sortQuery = url.searchParams.get("sort");
//   const sortType = sortQuery !== null ? sortQuery : "asc";

//   return json({ products, sortType });
// }

// export default function () {
//   const data = useLoaderData<typeof loader>();
//   return <ProductsList data={data} />;
// }
