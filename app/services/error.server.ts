import type { FieldErrors } from "remix-validated-form";

type ErrorArgs = {
  message: string;
  code: number;
};
type CustomErrorConstructor = {
  message: string;
  code?: number;
};

export class CustomError extends Error {
  code?: number;
  constructor({ message, code }: CustomErrorConstructor) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

export class FormValidationError extends CustomError {
  formName: string;
  fieldErrors?: FieldErrors;

  constructor(formName: string, fieldErrors?: FieldErrors) {
    super({ message: `Data is incorrect in form: ${formName}` });
    this.formName = formName;
    this.fieldErrors = fieldErrors;
  }
}

export class FormFieldsError extends FormValidationError {
  constructor(
    formName: string,
    fieldNames?: string[],
    errorMessage?: FieldErrors
  ) {
    const fields: FieldErrors = {};
    if (fieldNames && errorMessage) {
      fieldNames.forEach((field) => {
        fields[field] = errorMessage[field] ? errorMessage[field] : "Error";
      });
    }

    super(formName, fields);
  }
}
export class CustomAuthorizationError extends CustomError {
  cause?: string;
  fieldErrors?: FieldErrors;
  constructor(message: string, cause?: string, fieldErrors?: FieldErrors) {
    super({ message: `Access is denied ${cause}` });
    this.name = "CustomAuthorizationError";
    this.cause = cause;
    this.message = message;
    this.fieldErrors = fieldErrors;
  }
}

export class UnexpectedError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}
export class ValidationError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}

export class NotFound extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}

export class CreateError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}
export class UpdateError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}
export class DeleteError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}
export class AuthenticationError extends CustomError {
  constructor({ message, code }: ErrorArgs) {
    super({ message, code });
  }
}

export class CustomerError extends CustomError {
  login() {
    return new AuthenticationError({
      message: "Customer not logged",
      code: 6011,
    });
  }
  create() {
    return new CreateError({
      message: "Customer not created",
      code: 6101,
    });
  }
  update() {
    return new UpdateError({
      message: "Customer not updated",
      code: 6201,
    });
  }
  delete() {
    return new DeleteError({
      message: "Customer not deleted",
      code: 6301,
    });
  }
  notFound() {
    return new NotFound({
      message: "Customer not found",
      code: 6001,
    });
  }
}
export class CartError extends CustomError {
  create() {
    return new CreateError({
      message: "Cart not created",
      code: 7101,
    });
  }
  update() {
    return new UpdateError({
      message: "Cart not updated",
      code: 7201,
    });
  }
  delete() {
    return new DeleteError({
      message: "Cart not deleted",
      code: 7301,
    });
  }
  notFound() {
    return new NotFound({
      message: "Cart not found",
      code: 7001,
    });
  }
}
export class CartItemError extends CustomError {
  create() {
    return new CreateError({
      message: "CartItem not created",
      code: 8101,
    });
  }
  update() {
    return new UpdateError({
      message: "CartItem not updated",
      code: 8201,
    });
  }
  delete() {
    return new DeleteError({
      message: "CartItem not deleted",
      code: 8301,
    });
  }
  notFound() {
    return new NotFound({
      message: "CartItem not found",
      code: 8001,
    });
  }
}
