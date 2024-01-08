import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { loginSchema, registrationSchema } from "~/utils/formValidation";
import {
  createCustomer,
  existCustomer,
  login,
  type CustomerWithoutPassword,
} from "./customer.server";
import {
  AuthenticationError,
  CustomAuthorizationError,
  FormFieldsError,
  FormValidationError,
} from "./error.server";
import { sessionStorage } from "./session.server";

export const customerAuthenticator = new Authenticator<CustomerWithoutPassword>(
  sessionStorage
);

customerAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    try {
      const validFormData = await loginSchema.validate(form);

      if (validFormData.error && validFormData.error.fieldErrors) {
        const fieldsKey = Object.keys(validFormData.error.fieldErrors);
        const fieldErrors = validFormData.error.fieldErrors;
        throw new FormFieldsError("Login", fieldsKey, fieldErrors);
      }

      if (!validFormData.data) {
        throw new FormValidationError("Login");
      }

      const isCustomer = await existCustomer(validFormData.data.email);

      if (isCustomer) {
        try {
          const user = await login(validFormData.data);

          return user;
        } catch (error) {
          throw new AuthenticationError("Email or password are incorrect");
        }
      }
    } catch (error) {
      if (
        error instanceof FormValidationError ||
        error instanceof AuthenticationError
      ) {
        throw new CustomAuthorizationError(error.message, error.name);
      }
    }

    throw new CustomAuthorizationError("Email or password are incorrect");
  }),
  "customer-auth"
);
customerAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    try {
      const validFormData = await registrationSchema.validate(form);

      if (validFormData.error && validFormData.error.fieldErrors) {
        const fieldsKey = Object.keys(validFormData.error.fieldErrors);
        const fieldErrors = validFormData.error.fieldErrors;
        throw new FormFieldsError("Login", fieldsKey, fieldErrors);
      }
      if (!validFormData.data) {
        throw new FormValidationError("Registration");
      }
      const isCustomer = await existCustomer(validFormData.data.email);
      if (isCustomer) {
        throw new AuthenticationError("Email already in use");
      }

      const user = await createCustomer(validFormData);
      return user;
    } catch (error) {
      if (error instanceof FormFieldsError) {
        throw new CustomAuthorizationError(
          error.message,
          error.name,
          error.fieldErrors
        );
      }
      if (error instanceof AuthenticationError) {
        throw new CustomAuthorizationError(error.message, error.name);
      }

      throw new CustomAuthorizationError("Authorization error");
    }
  }),
  "customer-reg"
);
