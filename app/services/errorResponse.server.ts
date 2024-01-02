import { ZodError } from "zod";
import { CreateError, DeleteError, NotFound } from "./error.server";
import {
  BadRequest,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "./httpErrors.server";

export const getHTTPError = (error: unknown) => {
  let errorRequest;
  let responseError;
  if (error instanceof BadRequest) {
    errorRequest = new BadRequest(error.httpError.message);
    responseError = errorRequest?.httpError;
  }
  if (error instanceof ZodError) {
    errorRequest = new BadRequest(error.issues[0].message);
    responseError = errorRequest?.httpError;
  }
  if (error instanceof CreateError) {
    errorRequest = new BadRequest(error.message);
    responseError = errorRequest?.httpError;
  }
  if (error instanceof UnauthorizedError) {
    responseError = error.httpError;
  }
  if (error instanceof NotFound) {
    errorRequest = new NotFoundError(error.message);
    responseError = errorRequest?.httpError;
  }
  if (error instanceof DeleteError) {
    errorRequest = new BadRequest(error.message);
    responseError = errorRequest?.httpError;
  }
  if (responseError) {
    throw new Response(responseError.message, {
      status: responseError.status,
      statusText: responseError.name,
    });
  }
  errorRequest = new InternalServerError();
  responseError = errorRequest?.httpError;
  throw new Response(responseError.message, {
    status: responseError.status,
    statusText: responseError.name,
  });
};
