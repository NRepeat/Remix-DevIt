import type { HttpError } from "http-errors";
import {
  CartCreateError,
  CartDeleteError,
  CartNotFound,
  CartUpdateError,
} from "./cartError.server";
import {
  CartItemCreateError,
  CartItemDeleteError,
  CartItemNotFound,
  CartItemUpdateError,
} from "./cartItemError.server";
import {
  CustomerAuthenticationError,
  CustomerCreateError,
  CustomerDeleteError,
  CustomerNotFound,
  CustomerUpdateError,
} from "./customerError.server";
import {
  NotFound,
  UnexpectedError,
  ValidationError,
  type CustomError,
} from "./error.server";
import {
  BadRequest,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "./httpErrors.server";
import {
  ProductCreateError,
  ProductDeleteError,
  ProductNotFound,
  ProductUpdateError,
} from "./productError.server";

interface ErrorMappingType {
  [key: string]: {
    class?: new () => CustomError;
    httpError: (message: string) => HttpError;
  };
}

const errorMapping: ErrorMappingType = {
  ProductCreateError: {
    class: ProductCreateError,
    httpError: BadRequest,
  },
  ProductUpdateError: { class: ProductUpdateError, httpError: BadRequest },
  ProductDeleteError: { class: ProductDeleteError, httpError: BadRequest },
  ProductNotFound: { class: ProductNotFound, httpError: BadRequest },
  UnauthorizedError: { httpError: UnauthorizedError },
  CustomerCreateError: { class: CustomerCreateError, httpError: BadRequest },
  CustomerUpdateError: { class: CustomerUpdateError, httpError: BadRequest },
  CustomerDeleteError: { class: CustomerDeleteError, httpError: BadRequest },
  CustomerNotFound: { class: CustomerNotFound, httpError: NotFoundError },
  CustomerAuthenticationError: {
    class: CustomerAuthenticationError,
    httpError: BadRequest,
  },
  ValidationError: { class: ValidationError, httpError: BadRequest },
  UnexpectedError: {
    class: UnexpectedError,
    httpError: InternalServerError,
  },
  CartCreateError: { class: CartCreateError, httpError: BadRequest },
  CartUpdateError: { class: CartUpdateError, httpError: BadRequest },
  CartDeleteError: { class: CartDeleteError, httpError: BadRequest },
  CartNotFound: { class: CartNotFound, httpError: NotFoundError },
  CartItemCreateError: { class: CartItemCreateError, httpError: BadRequest },
  CartItemUpdateError: { class: CartItemUpdateError, httpError: BadRequest },
  CartItemDeleteError: { class: CartItemDeleteError, httpError: BadRequest },
  CartItemNotFound: { class: CartItemNotFound, httpError: NotFoundError },
  ZodError: { httpError: BadRequest },
  NotFound: { class: NotFound, httpError: NotFoundError },
};

function createHttpError(error: unknown) {
  if (error instanceof Object) {
    const errorType = errorMapping[`${error.constructor.name}`];
    if (errorType && errorType.class && error instanceof errorType.class) {
      return errorType.httpError(error.message);
    } else {
      return InternalServerError();
    }
  }
}

export const getResponseError = (error: unknown) => {
  const httpError = createHttpError(error);
  if (!httpError) {
    throw new Response("InternalServerError", { status: 500 });
  }
  throw new Response(httpError.message, {
    status: httpError.status,
    statusText: httpError.name,
  });
};
