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
  const existCartItem = await prisma.cartItem.findFirst({
    where: { productId },
  });

  if (!existCartItem) {
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        quantity,
      },
    });
    return newCartItem;
  }
  const updatedCartItem = updateCartItem(existCartItem.id, quantity);
  return updatedCartItem;
};

export const getCartItemById = async (cartItemId: number) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
      product: true,
    },
  });
  return cartItem;
};
export const updateCartItem = async (id: number, newData: any) => {
  try {
    const cartItem = await getCartItemById(id);
    const product = await getProduct(cartItem?.productId!);
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