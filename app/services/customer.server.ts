import type { Cart, Customer } from "@prisma/client";
import type { SuccessResult, ValidationResult } from "remix-validated-form";

export interface CreateCustomerArgs {
  email: string;
  name: string;
  lastName: string;
  password: string;
}
export interface UpdateCustomerArgs {
  email: string;
  name: string;
  lastName: string;
}
export type CustomerWithoutPassword = Omit<Customer, "password"> & {
  cart?: Cart | null;
};

export type LoginArgs = {
  email: string;
  password: string;
};

export const existCustomer = async (
  email: string
): Promise<CustomerWithoutPassword | null> => {
  try {
    const existCustomer = await prisma.customer.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        secondName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return existCustomer;
  } catch (error) {
    throw new Error(`An error occurred during find exist customer ${error}`);
  }
};
export const createCustomer = async ({
  data,
}: ValidationResult<CreateCustomerArgs>): Promise<CustomerWithoutPassword> => {
  try {
    if (!data) {
      throw new Error("Registration data undefined");
    }
    const customer = await prisma.customer.create({
      data: {
        email: data.email,
        name: data.name,
        secondName: data.lastName,
        password: data.password,
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
    throw new Error(`Failed to create customer`);
  }
};

export const login = async ({
  data,
}: ValidationResult<LoginArgs>): Promise<CustomerWithoutPassword> => {
  if (!data) {
    throw new Error("Error while attempting to login");
  }
  try {
    const customer = await prisma.customer.findUnique({
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

    return customer!;
  } catch (error) {
    throw new Error("Error while attempting to login");
  }
};

export const getAllCustomers = async (
  page: number
): Promise<{ customers: CustomerWithoutPassword[]; totalPages: number }> => {
  const pageSize: number = 10;
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
            include: { cartItems: { include: { product: true } } },
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
  data: SuccessResult<UpdateCustomerArgs>
): Promise<CustomerWithoutPassword> => {
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data: {
        name: data.data.name,
        secondName: data.data.lastName,
        email: data.data.email,
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
  search: string | null,
  page: number
): Promise<{ customers: CustomerWithoutPassword[]; totalPages: number }> => {
  try {
    if (!search) {
      return await getAllCustomers(page);
    }
    const pageSize: number = 10;
    const skip = (page - 1) * pageSize;

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
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { secondName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
      prisma.customer.count({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { secondName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCustomers / pageSize);
    return { customers, totalPages };
  } catch (error) {
    throw new Error(`Error during customer search: ${error}`);
  }
};
