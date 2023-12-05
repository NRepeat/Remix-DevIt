import { isProductInStock } from "~/utils/validation.server";
import { getProduct } from "./product.server";

export interface CartItemArgs {
  cartId: number;
  productId: number;
  quantity: number;
}

export const createCartItem = async ({
  cartId,
  productId,
  quantity,
}: CartItemArgs) => {
  try {
    const existCartItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
    if (existCartItem) {
      const updatedCartItem = await updateCartItem(existCartItem.id, quantity);
      return updatedCartItem;
    }
    if (await isProductInStock(productId, quantity)) {
      const newCartItem = await prisma.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });

      if (newCartItem) {
        return newCartItem;
      }
    } else {
      throw new Error("Product is out of stock");
    }
  } catch (error) {
    throw new Error("Failed to create/update cart item");
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
export const updateCartItem = async (id: number, newData: any) => {
  try {
    const cartItem = await getCartItemById(id);
    if (!cartItem) {
      throw new Error(`Item didn't exist`);
    }
    const product = await getProduct(cartItem.productId);
    if (product.stock <= newData) {
      throw new Error(`Out of stock `);
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
    throw new Error(`Error while deleting cart item ${error}`);
  }
};
