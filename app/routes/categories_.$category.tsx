import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import { getProductsByCategory } from "~/services/product.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sortType = url.searchParams.get("sort");
  const pageQuery = url.searchParams.get("page");
  const category = params.category;
  const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
  if (category) {
    const products = await getProductsByCategory(category, page, sortType);

    return json({ products, page });
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <ProductsList productsData={data.products} />
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
