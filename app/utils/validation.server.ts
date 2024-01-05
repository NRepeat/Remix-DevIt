import type { Product } from "@prisma/client";
import { z } from "zod";
import { memberAuthenticator } from "~/services/adminAuth.server";
import { customerAuthenticator } from "~/services/auth.server";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import type { Member } from "~/services/member.server";
export type isMemberWithDataPromise = Promise<{
  isMember: boolean;
  member?: Member;
}>;

export type isCustomerWithDataPromise = Promise<{
  isCustomer: boolean;
  customer: CustomerWithoutPassword | null;
}>;
export type isMemberWithData = { isMember: boolean; member?: Member };

export type isCustomerWithData = {
  isCustomer: boolean;
  customer: CustomerWithoutPassword | null;
};
export async function isProductInStock(
  product: Product,
  requestedQuantity: number
): Promise<boolean> {
  if (product.stock <= 0) {
    return false;
  }
  return product.stock >= requestedQuantity;
}
export function parseAndValidateNumber(number: number | string | null) {
  return z.coerce.number().parse(number);
}
export async function isMember(request: Request): isMemberWithDataPromise {
  const member = await memberAuthenticator.isAuthenticated(request);
  if (!member) {
    return { isMember: false };
  }
  return { isMember: true, member };
}

export async function isCustomer(request: Request): isCustomerWithDataPromise {
  const customer = await customerAuthenticator.isAuthenticated(request);
  if (!customer) {
    return { isCustomer: false, customer: null };
  }
  return { isCustomer: true, customer };
}
