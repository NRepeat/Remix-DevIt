import type { FieldErrors } from "remix-validated-form";

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
  constructor(message = "Unexpected error", error?: unknown) {
    super({ message });
  }
}
export class ValidationError extends CustomError {
  constructor(message = "Validation error", error?: unknown) {
    super({ message });
  }
}

export class NotFound extends CustomError {
  constructor(message = "NotFound ", error?: unknown) {
    super({ message });
  }
}
export class AuthenticationError extends CustomError {
  constructor(message: string, error?: unknown) {
    super({ message });
  }
}
