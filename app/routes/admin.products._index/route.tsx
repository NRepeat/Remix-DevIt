import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { validationProductDelete } from "~/components/Admin/ProductPanels/ProductsTable/ButtonContainer/ButtonContainer";
import Pagination from "~/components/Store/Pagination/Pagination";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { Button } from "~/components/Ui/Button/Button";
import { SearchBar } from "~/components/Ui/SearchBar/SearchBar";
import {
  deleteProduct,
  getAllProducts,
  searchProduct,
} from "~/services/product.server";

import Table from "~/components/Admin/ProductPanels/ProductsTable/Table";
import { parseAndValidateNumber } from "~/utils/validation.server";
import styles from "./styles.module.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search");
  const pageQuery = url.searchParams.get("page");
  const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;

  if (searchQuery === null) {
    const products = await getAllProducts({ page });
    if (products) {
      return json({ products, page });
    }
  }
  if (searchQuery === "") {
    return redirect("/admin/products");
  }

  const productsSearch = await searchProduct({ search: searchQuery! });

  return json({ productsSearch, page });
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

const breadcrumbs = [
  { label: "Home", link: "/" },
  { label: "Products", link: "" },
];

export default function () {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.search}>
        <SearchBar action="/admin/products" />
        <div className={styles.btnContainer}>
          <Button
            onClick={() => {
              submit(
                {},
                { action: "/products/sync", method: "post", navigate: false }
              );
            }}
          >
            Sync products
          </Button>
          <Link className={styles.link} to={"/admin/products/product/create"}>
            Create product
          </Link>
        </div>
      </div>
      {"products" in data ? (
        <>
          <Table products={data.products.products} />
          <Pagination
            admin={true}
            currentPage={data.page}
            totalPages={data.products.totalPages}
          />
        </>
      ) : (
        "productsSearch" in data && (
          <>
            <Table products={data.productsSearch.products} />
            <Pagination
              admin={true}
              currentPage={data.page}
              totalPages={data.productsSearch.totalPages}
            />
          </>
        )
      )}
    </>
  );
}
