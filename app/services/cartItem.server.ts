import {
  CartItemCreateError,
  CartItemDeleteError,
  CartItemNotFound,
  CartItemUpdateError,
} from "./cartItemError.server";
import { getProduct } from "./product.server";

export interface CartItemArgs {
  cartId: number;
  productId: number;
  quantity: number;
  externalId?: number;
}

export const createCartItem = async ({
  cartId,
  productId,
  quantity,
  externalId,
}: CartItemArgs) => {
  try {
    const product = await getProduct({ id: productId, externalId });
    if (product) {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });

      return newCartItem;
    }
  } catch (error) {
    throw new CartItemCreateError();
  }
};

export const getCartItemById = async (cartItemId: number) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });
    return cartItem;
  } catch (error) {
    throw new CartItemNotFound();
  }
};
export const updateCartItem = async (id: number, newData: number) => {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity: newData },
    });
    return updatedCartItem;
  } catch (error) {
    throw new CartItemUpdateError();
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id },
    });
    return deletedCartItem;
  } catch (error) {
    throw new CartItemDeleteError();
  }
};
