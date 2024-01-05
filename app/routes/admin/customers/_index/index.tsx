import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomerPanel/CustomersPanel";
import { validationCustomerDelete } from "~/components/Admin/CustomersPanels/CustomersTable/ButtonContainer/ButtonContainer";
import { deleteCustomer, searchCustomer } from "~/services/customer.server";
import { ValidationError } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search");
    if (searchQuery === "") {
      return redirect("/admin/customers");
    }
    const pageQuery = url.searchParams.get("page");
    const page = pageQuery ? z.coerce.number().parse(pageQuery) : 1;
    const customers = await searchCustomer(searchQuery, page);
    return json({ customers, page });
  } catch (error) {
    getResponseError(error);
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const validData = await validationCustomerDelete.validate(formData);
    if (validData.error) {
      throw new ValidationError();
    }
    await deleteCustomer(validData.data.customerId);
    return redirect("/admin/customers");
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <CustomersPanel data={data} />;
}
