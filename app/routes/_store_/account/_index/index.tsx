import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Details from "~/Pages/Account/Details/Details";
import { customerAuthenticator } from "~/services/auth.server";
import { getCustomer } from "~/services/customer.server";
import { getResponseError } from "~/services/errorResponse.server";
import { resolveAction } from "./actions";
import styles from "./styles.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const authCustomer = await customerAuthenticator.isAuthenticated(request);
    if (!authCustomer) {
      return redirect("/login");
    }
    const customer = await getCustomer(authCustomer.id);
    if (!customer) {
      return redirect("/login");
    }
    return json({ customer });
  } catch (error) {
    getResponseError(error);
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    await resolveAction(formData);
    return redirect("/account/");
  } catch (error) {
    getResponseError(error);
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h2 className={styles.title}>My Details</h2>
      <Details customer={data.customer} />
    </>
  );
}
