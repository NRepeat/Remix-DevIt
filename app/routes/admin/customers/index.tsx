import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomersPanel from "~/components/Admin/CustomersPanels/CustomerPanel/CustomersPanel";
import { validationCustomerDelete } from "~/components/Admin/CustomersPanels/CustomersTable/ButtonContainer/ButtonContainer";
import { deleteCustomer, searchCustomer } from "~/services/customer.server";
import {
  CustomerDeleteError,
  CustomerNotFoundError,
} from "~/services/customerError.server";
import { NotFoundError } from "~/services/error.server";
import {
  InternalServerResponse,
  NotFoundResponse,
} from "~/services/responseError.server";

import { parseAndValidateNumber } from "~/utils/validation.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search");
    if (searchQuery === "") {
      return redirect("/admin/customers");
    }
    const pageQuery = url.searchParams.get("page");
    const page = pageQuery ? parseAndValidateNumber(pageQuery) : 1;
    const customers = await searchCustomer(searchQuery, page);
    return json({ customers, page });
  } catch (error) {
    if (error instanceof CustomerNotFoundError) {
      throw new NotFoundResponse({ error });
    } else if (error instanceof NotFoundError) {
      throw new NotFoundResponse({ error });
    }
    throw new InternalServerResponse(
      { success: false, error: "Oh no! Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  if (!formData) {
    throw new Error("Error while deleting customer ");
  }
  const validData = await validationCustomerDelete.validate(formData);
  if (validData.data)
    try {
      await deleteCustomer(validData.data.customerId);
      return redirect("/admin/customers");
    } catch (error) {
      if (error instanceof CustomerDeleteError) {
        throw new InternalServerResponse(
          { success: false, error: "Error while deleting customer" },
          { status: 500 }
        );
      }
      throw new InternalServerResponse(
        { success: false, error: "Oh no! Something went wrong!" },
        { status: 500 }
      );
    }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return <CustomersPanel data={data} />;
}
