import { redirect } from "@remix-run/node";
import type { ValidationResult } from "remix-validated-form";
import { validationError } from "remix-validated-form";
import { passwordValidator } from "~/Pages/Account/Details/ChangePasswordForm/ChangePasswordForm";
import {
  checkPassword,
  updateCustomerByEmail,
  updateCustomerPassword,
} from "~/services/customer.server";
import { getResponseError } from "~/services/errorResponse.server";
import { BadRequests } from "~/services/httpErrors.server";
import { editSchema } from "~/utils/formValidation";

type PasswordValidatedForm = ValidationResult<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}>;

export async function updatePassword(validatedFormData: PasswordValidatedForm) {
  console.log(
    "🚀 ~ file: actions.ts:23 ~ updatePassword ~ validatedFormData:",
    validatedFormData
  );
  try {
    if (validatedFormData.error) {
      throw BadRequests();
    }
    const {
      confirmPassword,
      currentPassword: password,
      newPassword,
      email,
    } = validatedFormData.data;

    if (confirmPassword === newPassword) {
      if (await checkPassword(email, password)) {
        await updateCustomerPassword({ email, newPassword, password });
        return redirect("/account");
      } else {
        return validationError({
          fieldErrors: { currentPassword: "Password incorrect" },
        });
      }
    }
    return validationError({
      fieldErrors: { currentPassword: "Password mismatch" },
    });
  } catch (error) {
    getResponseError(error);
  }
}
type CustomerInformationValidatedFormData = ValidationResult<{
  email: string;
  name: string;
  lastName: string;
}>;
export async function updateCustomerInformation(
  validatedFormData: CustomerInformationValidatedFormData
) {
  console.log(
    "🚀 ~ file: actions.ts:63 ~ validatedFormData:",
    validatedFormData
  );
  try {
    if (validatedFormData.error) {
      throw BadRequests();
    }
    // const isExistCustomer = await existCustomer(validatedFormData.data.email);
    // console.log("🚀 ~ file: actions.ts:72 ~ isExistCustomer:", isExistCustomer);
    // if (isExistCustomer) {
    //   return validationError({
    //     fieldErrors: {
    //       email: "This email already exist",
    //     },
    //   });
    // }

    await updateCustomerByEmail(validatedFormData);
    return redirect("/account");
  } catch (error) {
    console.log("🚀 ~ file: actions.ts:83 ~ error:", error);
    getResponseError(error);
  }
}

export async function resolveAction(formData: FormData) {
  try {
    const validatedCustomerEditFormData = await editSchema.validate(formData);
    console.log(
      "🚀 ~ file: actions.ts:81 ~ resolveAction ~ validatedCustomerEditFormData:",
      validatedCustomerEditFormData
    );
    if (validatedCustomerEditFormData) {
      return await updateCustomerInformation(validatedCustomerEditFormData);
    }
    const validatedCustomerPasswordFormData =
      await passwordValidator.validate(formData);
    if (validatedCustomerPasswordFormData) {
      return await updatePassword(validatedCustomerPasswordFormData);
    }
    throw BadRequests();
  } catch (error) {
    getResponseError(error);
  }
}
