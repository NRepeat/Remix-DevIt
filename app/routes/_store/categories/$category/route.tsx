import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StoreRouteError from "~/components/Errors/RouteError/StoreRouteError";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import SortTypesList from "~/components/Store/Sort/SortTypesList";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { NotFound } from "~/services/error.server";
import { getHTTPError } from "~/services/errorResponse.server";
import {
  getAllProductCategories,
  getProductsByCategory,
} from "~/services/product.server";

import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const sortType = url.searchParams.get("sort");
    const pageQuery = url.searchParams.get("page");
    const category = params.category;
    if (!category) {
      throw new NotFound({ message: `Category not found`, code: 404 });
    }
    const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;

    const products = await getProductsByCategory({
      category,
      page,
      sortName: sortType,
    });
    const breadcrumbs = [
      { label: "Home", link: "/" },
      { label: "Categories", link: "/" },
      { label: `${category}`, link: `` },
    ];
    const categories = await getAllProductCategories();
    return json({ products, categories, page, breadcrumbs });
  } catch (error) {
    getHTTPError(error);
  }
}
export function ErrorBoundary() {
  return <StoreRouteError />;
}
export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Breadcrumbs breadcrumbs={data.breadcrumbs} />
      <ProductsList productsData={data.products} />
      <SortTypesList />
      <Pagination
        admin={false}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
