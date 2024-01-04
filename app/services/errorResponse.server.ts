import type { HttpError } from "http-errors";
import type { CustomError } from "./error.server";
import {
  BadRequests,
  InternalServerError,
  UnauthorizedError,
} from "./httpErrors.server";
import {
  ProductCreateError,
  ProductDeleteError,
  ProductNotFound,
  ProductUpdateError,
} from "./productError.server";

// export const getResponseErrosr = (error: unknown) => {
//   let errorRequest;
//   let responseError;
//   if (error instanceof BadRequest) {
//     errorRequest = new BadRequest(error.httpError.message);
//     responseError = errorRequest?.httpError;
//   }
//   if (error instanceof ZodError) {
//     errorRequest = new BadRequest(error.issues[0].message);
//     responseError = errorRequest?.httpError;
//   }
//   if (error instanceof CreateError) {
//     errorRequest = new BadRequest(error.message);
//     responseError = errorRequest?.httpError;
//   }
//   if (error instanceof UnauthorizedError) {
//     responseError = error.httpError;
//   }
//   if (error instanceof NotFound) {
//     errorRequest = new NotFoundError(error.message);
//     responseError = errorRequest?.httpError;
//   }
//   if (error instanceof DeleteError) {
//     errorRequest = new BadRequest(error.message);
//     responseError = errorRequest?.httpError;
//   }
//   if (responseError) {
//     throw new Response(responseError.message, {
//       status: responseError.status,
//       statusText: responseError.name,
//     });
//   }
//   errorRequest = new InternalServerError();
//   responseError = errorRequest?.httpError;
//   throw new Response(responseError.message, {
//     status: responseError.status,
//     statusText: responseError.name,
//   });
// };
interface ErrorMappingType {
  [key: string]: {
    class?: new () => CustomError;
    httpError: (message: string) => HttpError;
  };
}

const errorMapping: ErrorMappingType = {
  ProductCreateError: {
    class: ProductCreateError,
    httpError: BadRequests,
  },
  ProductUpdateError: { class: ProductUpdateError, httpError: BadRequests },
  ProductDeleteError: { class: ProductDeleteError, httpError: BadRequests },
  ProductNotFound: { class: ProductNotFound, httpError: BadRequests },
  UnauthorizedError: { httpError: UnauthorizedError },
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
