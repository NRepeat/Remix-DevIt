import type { Cart, Customer } from "@prisma/client";
import type { SuccessResult, ValidationResult } from "remix-validated-form";
import {
  CustomerError,
  UnexpectedError,
  ValidationError,
} from "./error.server";

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
    throw new CustomerError({
      message: `An error occurred during find exist customer`,
    }).notFound();
  }
};
export const createCustomer = async ({
  data,
}: ValidationResult<CreateCustomerArgs>): Promise<CustomerWithoutPassword> => {
  try {
    if (!data) {
      throw new ValidationError({
        message: "Registration data undefined",
        code: 6222,
      });
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
    throw new CustomerError({ message: `Failed to create customer` }).create();
  }
};

export const login = async (
  data: LoginArgs
): Promise<CustomerWithoutPassword> => {
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

    if (customer === null) {
      throw new CustomerError({ message: "Invalid email or password" }).login();
    }

    return customer;
  } catch (error) {
    throw new UnexpectedError({
      message: "Unexpected error while login customer",
      code: 2222,
    });
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
    throw new CustomerError({
      message: "Error while attempting to get all customers",
    }).notFound();
  }
};
export const getCustomer = async (
  customerId: number
): Promise<Customer | null> => {
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
        password: true,
        cart: {
          include: { cartItems: true },
        },
      },
    });

    return customer;
  } catch (error) {
    throw new CustomerError({ message: `Customer not found` }).notFound();
  }
};
export const getCustomerById = async (
  customerId: number
): Promise<CustomerWithoutPassword | null> => {
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
    throw new CustomerError({ message: `Customer not found` }).notFound();
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
    throw new CustomerError({
      message: `Error while attempting to update customer`,
    }).update();
  }
};

export const updateCustomerByEmail = async (
  data: SuccessResult<UpdateCustomerArgs>
): Promise<CustomerWithoutPassword> => {
  console.log("🚀 ~ file: customer.server.ts:228 ~ data:", data);
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { email: data.data.email },
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
    console.log("🚀 ~ file: customer.server.ts:249 ~ error:", error);
    throw new CustomerError({
      message: `Error while attempting to update customer`,
    }).update();
  }
};

export const deleteCustomer = async (
  customerId: number
): Promise<CustomerWithoutPassword | null> => {
  try {
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
    throw new CustomerError({ message: `Customer not deleted` }).delete();
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
    throw new CustomerError({
      message: `Error while attempting to search customer`,
    }).notFound();
  }
};

export const checkPassword = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const isValidPassword = await prisma.customer.findUnique({
      where: { email, password },
    });
    return !!isValidPassword;
  } catch (error) {
    throw new CustomerError({ message: "" }).notFound();
  }
};

type UpdateCustomerPasswordArgs = {
  email: string;
  password: string;
  newPassword: string;
};
export const updateCustomerPassword = async ({
  email,
  password,
  newPassword,
}: UpdateCustomerPasswordArgs) => {
  try {
    const updatePassword = prisma.customer.update({
      where: { email },
      data: { password: newPassword },
      select: {
        email: true,
        name: true,
      },
    });
    return updatePassword;
  } catch (error) {
    throw new Error("");
  }
};
