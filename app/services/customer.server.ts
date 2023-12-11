import type { Cart, Customer } from "@prisma/client";
import type { SuccessResult } from "remix-validated-form";
export interface CustomerArgs {
  email: string;
  name: string;
  secondName: string;
}
export interface CreateCustomerArgs {
  email: string;
  name: string;
  secondName: string;
  password: string;
}
export type CustomerWithoutPassword = Omit<Customer, "password"> & {
  cart?: Cart | null;
};

export type LoginProps = {
  email: string;
  password: string;
};
export type ServerError = {
  error: string;
  code: string;
};
export const createCustomer = async ({
  email,
  name,
  secondName,
  password,
}: CreateCustomerArgs): Promise<CustomerWithoutPassword> => {
  try {
    const existCustomer = await prisma.customer.findFirst({ where: { email } });
    if (existCustomer) {
      throw new Error(`Customer with email ${email} already exists`);
    }
    try {
      const customer = await prisma.customer.create({
        data: {
          email,
          name,
          secondName,
          password,
        },
        select: {
          id: true,
          email: true,
          name: true,
          secondName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return customer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error}`);
    }
  } catch (error) {
    throw new Error(`Error while attempting to create customer: ${error}`);
  }
};

export const login = async ({
  data,
}: SuccessResult<LoginProps>): Promise<
  CustomerWithoutPassword | ServerError
> => {
  try {
    const existCustomer = await prisma.customer.findFirst({
      where: { email: data.email, password: data.password },
      select: {
        id: true,
        email: true,
        name: true,
        secondName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!existCustomer) {
      return { error: "Not found", code: "404" };
    }

    return existCustomer;
  } catch (error) {
    throw new Error("An error occurred during login");
  }
};

export const getAllCustomers = async (
  page: number
): Promise<{ customers: CustomerWithoutPassword[]; totalPages: number }> => {
  const pageSize: number = 5;
  const skip = (page - 1) * pageSize;
  try {
    const [customers, totalCustomers] = await Promise.all([
      prisma.customer.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          secondName: true,
          createdAt: true,
          updatedAt: true,
          cart: {
            include: { cartItems: true },
          },
        },
        skip,
        take: pageSize,
      }),
      prisma.customer.count(),
    ]);

    const totalPages = Math.ceil(totalCustomers / pageSize);
    return { customers, totalPages };
  } catch (error) {
    throw new Error("Error while attempting to get all customers");
  }
};

export const getCustomerById = async (
  customerId: number
): Promise<CustomerWithoutPassword | null> => {
  if (!customerId) {
    throw new Error(`Missing customer id`);
  }
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      select: {
        id: true,
        email: true,
        name: true,
        secondName: true,
        createdAt: true,
        updatedAt: true,
        cart: {
          include: { cartItems: true },
        },
      },
    });

    return customer;
  } catch (error) {
    throw new Error(`Error while attempting to get customer by ID: ${error}`);
  }
};
export const updateCustomer = async (
  customerId: number,
  newData: CustomerArgs
): Promise<CustomerWithoutPassword> => {
  try {
    const existingCustomer = await getCustomerById(customerId);

    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: newData,
      select: {
        id: true,
        email: true,
        name: true,
        secondName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedCustomer;
  } catch (error) {
    throw new Error(`Error while attempting to update customer: ${error}`);
  }
};

export const deleteCustomer = async (
  customerId: number
): Promise<CustomerWithoutPassword | null> => {
  try {
    const existingCustomer = await getCustomerById(customerId);
    if (!existingCustomer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const deletedCustomer = await prisma.customer.delete({
      where: { id: customerId },
      select: {
        id: true,
        email: true,
        name: true,
        secondName: true,
        createdAt: true,
        updatedAt: true,
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
  } catch (error) {
    throw new Error(`Error while attempting to delete customer: ${error}`);
  }
};

export const searchCustomer = async (
  q: string | null,
  page: number
): Promise<{ customers: CustomerWithoutPassword[]; totalPages: number }> => {
  try {
    if (q === null) {
      return await getAllCustomers(page);
    }

    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { secondName: { contains: q, mode: "insensitive" } },
        ],
      },
      include: {
        cart: {
          include: {
            cartItems: true,
          },
        },
      },
    });

    return { customers, totalPages: 0 };
  } catch (error) {
    throw new Error(`Error during customer search: ${error}`);
  }
};
