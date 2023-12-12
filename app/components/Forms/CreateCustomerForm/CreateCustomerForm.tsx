import type { FC } from "react";
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

  classNames?: string;
};

const CreateCustomerForm: FC<FormProps> = ({ formData }) => {
  return (
    <ValidatedForm
      method="post"
      validator={registrationSchema}
      className={styles.form}
    >
      <FormInput label="Name" name="name" />
      <FormInput label="Last Name" name="lastName" />
      <FormInput label="Email" name="email" />
      <FormInput label="Password" name="password" />

      <Button className={styles.loginButton} type="submit">
        Sign up
      </Button>
    </ValidatedForm>
  );
};

export default CreateCustomerForm;
