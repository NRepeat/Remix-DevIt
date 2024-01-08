import type { HttpError } from "http-errors";
import { CustomError } from "./error.server";
import { errorMapping } from "./errorMapType.server";
import { createInternalServerError } from "./httpErrors.server";

export interface ErrorMappingType {
  [key: string]: (message?: string) => HttpError;
}

function createHttpError(error: unknown) {
  if (error instanceof CustomError) {
    const httpError = errorMapping[`${error.constructor.name}`];

    return httpError(error.message);
  } else {
    return createInternalServerError();
  }
}

export const getResponseError = (error: unknown) => {
  const httpError = createHttpError(error);
  if (!httpError) {
    throw new Response("createInternalServerError", { status: 500 });
  }
  throw new Response(httpError.message, {
    status: httpError.status,
    statusText: httpError.name,
  });
};
