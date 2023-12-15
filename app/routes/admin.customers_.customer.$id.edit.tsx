import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import invariant from "tiny-invariant";
import EditCustomerPanel from "~/components/Admin/CustomersPanels/EditCustomerPanel/EditCustomerPanel";
import {
  existCustomer,
  getCustomerById,
  updateCustomer,
} from "~/services/customer.server";
import { editSchema } from "~/utils/formValidation";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    invariant(params.id);
    const customer = await getCustomerById(parseInt(params.id));
    if (!customer) {
      throw new Error("Customer Not Found");
    }
    return json({ customer });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}
export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.id);
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedCustomerData = await editSchema.validate(formData);
    if (validatedCustomerData.error) {
      return validationError(validatedCustomerData.error);
    }
    const customer = await getCustomerById(parseInt(params.id));
    if (customer) {
      const isExistCustomer = await existCustomer(
        validatedCustomerData.data.email
      );
      if (!isExistCustomer) {
        await updateCustomer(customer.id, validatedCustomerData);
        return redirect("/admin/customers");
      }
      return validationError({
        fieldErrors: {
          email: "This email already exist",
        },
      });
    }
    return validationError({ fieldErrors: { password: "Updating error" } });
  } catch (error) {
    throw new Response(`Error while updating customer${error}`);
  }
}
export default function () {
  const data = useLoaderData<typeof loader>();
  return <EditCustomerPanel customer={data.customer} />;
}
