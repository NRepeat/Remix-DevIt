import { isProductInStock } from "~/utils/validation.server";
import { CartItemDeleteError } from "./cartItemError.server";

export interface CartItemArgs {
  cartId: number;
  quantity: number;
  externalId: number;
}

export const createCartItem = async ({
  cartId,
  externalId,
  quantity,
}: CartItemArgs) => {
  try {
    const existCartItem = await prisma.cartItem.findFirst({
      where: { cartId, productId: externalId },
    });
    if (existCartItem) {
      const updatedCartItem = await updateCartItem(existCartItem.id, quantity);
      return updatedCartItem;
    }
    if (await isProductInStock(externalId, quantity)) {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId: externalId,
          quantity,
        },
      });

      return newCartItem;
    } else {
      throw new Error("Product is out of stock");
    }
  } catch (error) {
    throw new Error(`Failed to create/update cart item ${error}`);
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
    if (cartItem) {
      return cartItem;
    }
  } catch (error) {
    throw new Error("Failed to get cart item by ID");
  }
};
export const updateCartItem = async (id: number, newData: number) => {
  try {
    const cartItem = await getCartItemById(id);
    if (!cartItem) {
      throw new Error(`Item didn't exist`);
    }
    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity: newData },
    });
    return updatedCartItem;
  } catch (error) {
    throw new Error(`Error while updating cart item ${error}`);
  }
};

export const deleteCartItem = async (id: number) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id },
    });
    return deletedCartItem;
  } catch (error) {
    if (error instanceof Error) {
      throw new CartItemDeleteError(error);
    }
    throw new Error(`Error while deleting cart item ${error}`);
  }
};
