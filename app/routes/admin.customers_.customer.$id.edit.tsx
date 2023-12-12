import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
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
  invariant(params.id);
  const customer = await getCustomerById(parseInt(params.id!));
  if (!customer) {
    throw new Response("Customer Not Found", { status: 404 });
  }
  return json({ customer });
}
export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.id);
  try {
    const formData = Object.fromEntries(await request.formData());

    const validatedCustomerData = await editSchema.validate(formData);
    if (validatedCustomerData.error) {
      return validationError(validatedCustomerData.error);
    }
    const updatableCustomer = await getCustomerById(parseInt(params.id));
    if (updatableCustomer) {
      const isExistCustomer = await existCustomer(
        validatedCustomerData.data.email
      );
      if (!isExistCustomer) {
        await updateCustomer(updatableCustomer.id, validatedCustomerData);
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
  const actionData = useActionData<typeof action>();
  return <EditCustomerPanel customer={data.customer} actionData={actionData} />;
}
