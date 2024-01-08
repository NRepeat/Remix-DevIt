import { z } from "zod";
import type { CartWithItems } from "~/services/cart.server";
import { createCartItem, updateCartItem } from "~/services/cartItem.server";
import type { Cart } from "~/services/cartSession.server";
import { NotFound } from "~/services/error.server";
import { getResponseError } from "~/services/errorResponse.server";
import { getProduct } from "~/services/product.server";

export const addToCart = async (cart: CartWithItems, sessionCart: Cart) => {
  try {
    const cartSessionItems = sessionCart.items();
    console.log(
      "🚀 ~ file: actions.ts:12 ~ addToCart ~ cartSessionItems:",
      cartSessionItems
    );

    const { cartItems } = cart;

    await Promise.all(
      cartSessionItems.map(async (item) => {
        const matchingCartItem = cartItems.find(
          (cartItem) => cartItem.productId === item.productId
        );

        if (matchingCartItem) {
          await updateCartItem(matchingCartItem.id, item.quantity);
        } else {
          await createCartItem({
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      })
    );
  } catch (error) {
    getResponseError(error);
  }
};

export const checkProduct = async (formData: FormData) => {
  try {
    const slug = z.coerce.string().parse(formData.get("slug"));
    if (!slug) {
      throw new NotFound("Product slug not found");
    }

    const product = await getProduct({ slug });

    if (!product) {
      throw new NotFound(`${slug}`);
    }
    return product;
  } catch (error) {
    getResponseError(error);
  }
};
