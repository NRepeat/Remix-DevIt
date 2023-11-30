import { Customer } from "@prisma/client";
import bcrypt from "bcrypt";
export interface CustomerArgs {
  email: string;
  name: string;
  secondName: string;
  password: string;
}

export const createCustomer = async ({
  email,
  name,
  secondName,
  password,
}: CustomerArgs): Promise<Customer> => {
  const hashPassword = await bcrypt.hash(password, 3);
  const customer = await prisma.customer.create({
    data: {
      email,
      name,
      secondName,
      password: hashPassword,
    },
  });
  return customer;
};

export const getCustomerById = async (
  customerId: number
): Promise<Customer | null> => {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    include: {
      cart: {
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  return customer;
};
export const updateCustomer = async (
  customerId: number,
  newData: string
): Promise<Customer> => {
  const updatedCustomer = await prisma.customer.update({
    where: { id: customerId },
    data: newData,
  });
  return updatedCustomer;
};
export const deleteCustomer = async (customerId: number): Promise<Customer> => {
  const deletedCustomer = await prisma.customer.delete({
    where: { id: customerId },
    include: {
      cart: {
        include: {
          cartItems: true,
        },
      },
    },
  });

  if (deletedCustomer?.cart?.cartItems) {
    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: deletedCustomer.cart.cartItems.map((item) => item.id),
        },
      },
    });
  }

  return deletedCustomer;
};
