import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { loginSchema, registrationSchema } from "~/utils/formValidation";
import {
  createCustomer,
  login,
  type CustomerWithoutPassword,
} from "./customer.server";
import { sessionStorage } from "./session.server";

export const customerAuthenticator = new Authenticator<CustomerWithoutPassword>(
  sessionStorage
);

customerAuthenticator.use(
  new FormStrategy(async ({ form, context }) => {
    if (!form) {
      throw new Error("Customer login action error");
    }
    const validFromData = await loginSchema.validate(form);

    if (validFromData.error) {
      throw new AuthorizationError("Email or password are incorrect");
    }

    let user = await login(validFromData.data);

    if (user === null) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    return user;
  }),
  "customer-auth"
);
customerAuthenticator.use(
  new FormStrategy(async ({ form }) => {
    if (!form) {
      throw new Error("Customer registration action error");
    }
    const validatedCustomerData = await registrationSchema.validate(form);
    if (validatedCustomerData.error) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    let user = await createCustomer(validatedCustomerData);
    if (user === null) {
      throw new AuthorizationError("Email or password are incorrect");
    }
    return user;
  }),
  "customer-reg"
);
