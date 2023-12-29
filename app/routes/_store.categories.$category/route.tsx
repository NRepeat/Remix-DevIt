import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StoreRouteError from "~/components/Errors/RouteError/StoreRouteError";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import SortTypesList from "~/components/Store/Sort/SortTypesList";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { NotFoundError } from "~/services/error.server";
import {
  getAllProductCategories,
  getProductsByCategory,
} from "~/services/product.server";
import { ProductNotFoundError } from "~/services/productError.server";
import { InternalServerResponse, NotFoundResponse } from "~/services/responseError.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const sortType = url.searchParams.get("sort");
    const pageQuery = url.searchParams.get("page");
    const category = params.category;
    if (!category) {
      throw new NotFoundError({
        message: `Category not found`,
      });
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
    if (error instanceof ProductNotFoundError) {
      throw new NotFoundResponse(
        { error }
      );
    } else if (error instanceof NotFoundError) {
      throw new NotFoundResponse(
        { error }
      );
    }
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
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
