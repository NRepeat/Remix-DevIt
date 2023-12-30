import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { validationCartDelete } from "~/components/Admin/CartPanels/SingleCart/CartItemsList/Form";
import SingleCart from "~/components/Admin/CartPanels/SingleCart/SingleCart";
import { getCartByCustomerId } from "~/services/cart.server";
import { deleteCartItem } from "~/services/cartItem.server";
import { CartItemDeleteError } from "~/services/cartItemError.server";
import { getCustomerById } from "~/services/customer.server";
import { CustomerNotFoundError } from "~/services/customerError.server";
import { NotFoundError } from "~/services/error.server";
import {
  InternalServerResponse,
  NotFoundResponse,
} from "~/services/responseError.server";
import { parseAndValidateNumber } from "~/utils/validation.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    invariant(params.id);
    const customerId = parseAndValidateNumber(params.id);

    const customer = await getCustomerById(customerId);
    const cart = await getCartByCustomerId(customerId);
    if (!customer || !cart) {
      throw new NotFoundError({ message: "Customer Not Found" });
    }
    return json({ customer, cart });
  } catch (error) {
    if (error instanceof CustomerNotFoundError) {
      throw new NotFoundResponse({ error });
    } else if (error instanceof NotFoundError) {
      throw new NotFoundResponse({ error });
    }
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
};

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    if (request.method === "DELETE") {
      const deleteData = await validationCartDelete.validate(formData);
      if (deleteData.data) {
        await deleteCartItem(deleteData.data.itemId);
        return json({ successes: true });
      }
    }

    return json({ successes: true });
  } catch (error) {
    if (error instanceof CartItemDeleteError) {
      throw new InternalServerResponse(
        { success: false, error: "Error while deleting cart item" },
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

  return <SingleCart customer={data.customer} cart={data.cart} />;
}
