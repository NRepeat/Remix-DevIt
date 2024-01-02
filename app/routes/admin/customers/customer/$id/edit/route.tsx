import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import EditCustomerPanel from "~/components/Admin/CustomersPanels/EditCustomerPanel/EditCustomerPanel";
import {
  existCustomer,
  getCustomerById,
  updateCustomer,
} from "~/services/customer.server";
import { NotFound } from "~/services/error.server";
import { getHTTPError } from "~/services/errorResponse.server";
import { BadRequest } from "~/services/httpErrors.server";
import { editSchema } from "~/utils/formValidation";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const customer = await getCustomerById(z.coerce.number().parse(params.id));
    if (!customer) {
      throw new NotFound({ message: "Customer Not Found", code: 6000 });
    }
    return json({ customer });
  } catch (error) {
    getHTTPError(error);
  }
}
export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedCustomerData = await editSchema.validate(formData);
    if (validatedCustomerData.error) {
      return validationError(validatedCustomerData.error);
    }
    const customer = await getCustomerById(z.coerce.number().parse(params.id));
    if (customer) {
      const isExistCustomer = await existCustomer(
        validatedCustomerData.data.email
      );
      if (
        !isExistCustomer ||
        customer.email === validatedCustomerData.data.email
      ) {
        await updateCustomer(customer.id, validatedCustomerData);
        return redirect("/admin/customers");
      }
      return validationError({
        fieldErrors: {
          email: "This email already exist",
        },
      });
    }
    throw new BadRequest("Error while edit customer");
  } catch (error) {
    getHTTPError(error);
  }
}
export default function () {
  const data = useLoaderData<typeof loader>();
  return <EditCustomerPanel customer={data.customer} />;
}
