import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Pagination from "~/components/Store/Pagination/Pagination";
import ProductsList from "~/components/Store/ProductsList/ProductsList";
import Sidebar from "~/components/Store/SideBar/SideBar";
import SortTypesList from "~/components/Store/Sort/SortTypesList";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import {
  getAllProductCategories,
  getProductsByCategory,
} from "~/services/product.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const sortType = url.searchParams.get("sort");
  const pageQuery = url.searchParams.get("page");
  const category = params.category;
  const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
  if (category) {
    const products = await getProductsByCategory(category, page, sortType);
    const breadcrumbs = [
      { label: "Home", link: "/" },
      { label: "Categories", link: "/" },
      { label: `${category}`, link: `/categories/${category}` },
    ];
    const categories = await getAllProductCategories();
    return json({ products, categories, page, breadcrumbs });
  }
}
export default function () {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Breadcrumbs breadcrumbs={data.breadcrumbs} admin={false} />
      <Sidebar links={data.categories} />
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
