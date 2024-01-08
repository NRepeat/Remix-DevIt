import type { ErrorMappingType } from "./errorResponse.server";
import {
  createBadRequest,
  createInternalServerError,
  createNotFoundError,
  createUnauthorizedError,
} from "./httpErrors.server";

export const errorMapping: ErrorMappingType = {
  ProductCreateError: createBadRequest,
  ProductUpdateError: createBadRequest,
  ProductDeleteError: createBadRequest,
  ProductNotFound: createBadRequest,
  createUnauthorizedError: createUnauthorizedError,
  CustomerCreateError: createBadRequest,
  CustomerUpdateError: createBadRequest,
  CustomerDeleteError: createBadRequest,
  CustomerNotFound: createNotFoundError,
  CustomerAuthenticationError: createBadRequest,
  ValidationError: createBadRequest,
  UnexpectedError: createInternalServerError,
  CartCreateError: createBadRequest,
  CartUpdateError: createBadRequest,
  CartDeleteError: createBadRequest,
  CartNotFound: createNotFoundError,
  CartItemCreateError: createBadRequest,
  CartItemUpdateError: createBadRequest,
  CartItemDeleteError: createBadRequest,
  CartItemNotFound: createNotFoundError,
  ZodError: createBadRequest,
  NotFound: createNotFoundError,
};
