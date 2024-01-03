import type { HttpError } from "http-errors";
import { BadRequests, InternalServerError } from "./httpErrors.server";

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
    httpError: (message: string) => HttpError;
  };
}
const ErrorMapping: ErrorMappingType = {
  ProductCreateError: {
    httpError: BadRequests,
  },
  // ProductUpdateError: { class: ProductUpdateError, httpError: BadRequest },
  // ProductDeleteError: { class: ProductDeleteError, httpError: BadRequest },
  // ProductNotFound: { class: ProductNotFound, httpError: NotFoundError },
};

function createHttpError(error: unknown) {
  let responseError;
  let errorType;

  if (error instanceof Object) {
    errorType = ErrorMapping[`${error.constructor.name}`];
  }

  if (errorType && error instanceof errorType) {
    responseError = errorType.httpError(error.message).httpError;
  } else {
    responseError = new InternalServerError().httpError;
  }

  return responseError;
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
