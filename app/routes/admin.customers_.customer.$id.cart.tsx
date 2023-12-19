import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  validationCart,
  validationCartDelete,
} from "~/components/Admin/CartPanels/SingleCart/CartItemsList/Form";
import SingleCart from "~/components/Admin/CartPanels/SingleCart/SingleCart";
import { getCartByCustomerId } from "~/services/cart.server";
import { deleteCartItem, updateCartItem } from "~/services/cartItem.server";
import { getCustomerById } from "~/services/customer.server";
import { updateProduct } from "~/services/product.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  try {
    invariant(params.id);
    const customerId = parseInt(params.id);

    const customer = await getCustomerById(customerId);
    const cart = await getCartByCustomerId(customerId);
    if (!customer || !cart) {
      throw new Error("Customer Not Found");
    }
    return json({ customer, cart });
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
};

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const parsedFormData = await validationCart.validate(formData);

    if (request.method === "DELETE") {
      const deleteData = await validationCartDelete.validate(formData);
      if (deleteData.data) {
        await deleteCartItem(deleteData.data.itemId);
        return json({ successes: true });
      }
    }

    if (parsedFormData.data) {
      await updateProduct(parsedFormData.data.productId, {
        price: parsedFormData.data.price,
        rating: parsedFormData.data.rating,
      });
      await updateCartItem(
        parsedFormData.data.itemId,
        parsedFormData.data.quantity
      );

      return json({ successes: true });
    }
  } catch (error) {
    throw new Response("Oh no! Something went wrong!", {
      status: 500,
    });
  }
}

export default function () {
  const data = useLoaderData<typeof loader>();

  return <SingleCart customer={data.customer} cart={data.cart} />;
}
