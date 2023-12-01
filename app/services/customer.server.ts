import { Customer } from "@prisma/client";
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
export type CustomerWithoutPassword = Omit<Customer, "password">;

export const createCustomer = async ({
  email,
  name,
  secondName,
  password,
}: CreateCustomerArgs ): Promise<CustomerWithoutPassword> => {
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

export const getAllCustomers = async (): Promise<CustomerWithoutPassword[]> => {
  try {
    const customers = await prisma.customer.findMany({
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
  
    return customers;
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
