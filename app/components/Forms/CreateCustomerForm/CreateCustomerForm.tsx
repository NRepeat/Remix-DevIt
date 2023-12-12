import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { ValidationErrorResponseData } from "remix-validated-form";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/FormInput";
import { registrationSchema } from "~/utils/formValidation";
import styles from "./styles.module.css";
type FormProps = {
  formData?: {
    name: string;
    secondName: string;
    email: string;
    id: number;
  };
  actionData:
    | ValidationErrorResponseData
    | {
        error: string;
      }
    | undefined;
  classNames?: string;
};

const CreateCustomerForm: FC<FormProps> = ({ formData, actionData }) => {
  return (
    <ValidatedForm
      method="post"
      validator={registrationSchema}
      className={styles.form}
    >
      <FormInput label="Name" name="name" />
      <FormInput label="Last Name" name="lastName" />
      <FormInput label="Email" name="email" />
      {actionData && "error" in actionData && <span> {actionData.error}</span>}
      <FormInput label="Password" name="password" />
      <Link to={"/"} className={styles.forgot}>
        Forgot password?
      </Link>
      <Button className={styles.loginButton} type="submit">
        Sign up
      </Button>
    </ValidatedForm>
  );
};

export default CreateCustomerForm;
