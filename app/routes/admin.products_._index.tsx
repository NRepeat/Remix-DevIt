import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { validationProductDelete } from "~/components/Admin/ProductPanels/ProductsTable/ButtonContainer/ButtonContainer";
import ProductsList from "~/components/Admin/ProductPanels/ProductsTable/ProductsList";
import Pagination from "~/components/Store/Pagination/Pagination";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { SearchBar } from "~/components/Ui/SearchBar/SearchBar";
import { deleteProduct, searchProduct } from "~/services/product.server";
import adminProductsStylesHref from "../styles/adminProductsStylesHref.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: adminProductsStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const page = pageQuery ? parseInt(pageQuery) : 1;

  if (searchQuery === "") {
    return redirect("/admin/products");
  }

  const products = await searchProduct(searchQuery!, page);
  if (!products) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
  return json({ products, page });
};
export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const validFormData = await validationProductDelete.validate(formData);

    if (request.method === "DELETE") {
      if (validFormData.data) {
        await deleteProduct(validFormData.data.productId);
        return json({ successes: true });
      }
    }
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

const breadcrumbs = [{ label: "Products", link: "/admin/products" }];

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      <div className="search">
        <SearchBar action="/admin/products" />
        <Link className="link" to={"/admin/products/product/create"}>
          Create product
        </Link>
      </div>

      <ProductsList products={data.products.products} />
      <Pagination
        admin={true}
        currentPage={data.page}
        totalPages={data.products.totalPages}
      />
    </>
  );
}
