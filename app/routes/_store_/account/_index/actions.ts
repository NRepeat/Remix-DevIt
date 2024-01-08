import { redirect } from "@remix-run/node";
import type { ValidationResult } from "remix-validated-form";
import { validationError } from "remix-validated-form";
import { passwordValidator } from "~/Pages/Account/Details/ChangePasswordForm/ChangePasswordForm";
import {
  checkPassword,
  existCustomer,
  getCustomerById,
  updateCustomer,
  updateCustomerPassword,
} from "~/services/customer.server";
import { getResponseError } from "~/services/errorResponse.server";
import { createBadRequest } from "~/services/httpErrors.server";
import { editSchema } from "~/utils/formValidation";

type PasswordValidatedForm = ValidationResult<{
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailP: string;
}>;

export async function updatePassword(validatedFormData: PasswordValidatedForm) {
  try {
    if (validatedFormData.error) {
      throw createBadRequest();
    }
    const {
      confirmPassword,
      currentPassword: password,
      newPassword,
      emailP: email,
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
  id: number;
}>;
export async function updateCustomerInformation(
  validatedFormData: CustomerInformationValidatedFormData
) {
  try {
    if (validatedFormData.error) {
      throw createBadRequest();
    }
    const customer = await getCustomerById(validatedFormData.data.id);
    if (customer) {
      const isExistCustomer = await existCustomer(validatedFormData.data.email);
      if (!isExistCustomer || customer.email === validatedFormData.data.email) {
        await updateCustomer(validatedFormData.data.id, validatedFormData);
        return redirect("/account");
      }
      return validationError({
        fieldErrors: {
          email: "This email already exist",
        },
      });
    }
    throw createBadRequest();
  } catch (error) {
    getResponseError(error);
  }
}

export async function resolveAction(formData: FormData) {
  try {
    const validatedCustomerEditFormData = await editSchema.validate(formData);

    if (validatedCustomerEditFormData) {
      return await updateCustomerInformation(validatedCustomerEditFormData);
    }
    const validatedCustomerPasswordFormData =
      await passwordValidator.validate(formData);
    if (validatedCustomerPasswordFormData) {
      return await updatePassword(validatedCustomerPasswordFormData);
    }
    throw createBadRequest();
  } catch (error) {
    getResponseError(error);
  }
}
