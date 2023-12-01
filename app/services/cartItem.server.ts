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
  const existCartItem =  await prisma.cartItem.findFirst({
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
  const updatedCartItem = updateCartItem(existCartItem.id,quantity)
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
export const updateCartItem = async (cartItemId: number, newData: any) => {
  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: {quantity:newData},
  });
  return updatedCartItem;
};

export const deleteCartItem = async (cartItemId: number) => {
  const deletedCartItem = await prisma.cartItem.delete({
    where: { id: cartItemId },
  });
  return deletedCartItem;
};