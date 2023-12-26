import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Ui/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
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
    <div className={styles.container}>
      <ValidatedForm
        method="post"
        validator={registrationSchema}
        className={styles.form}
      >
        <FormInput placeholder="Name" label="Name" name="name" />
        <FormInput placeholder="Last Name" label="Last Name" name="lastName" />
        <FormInput placeholder="Email" label="Email" name="email" />
        <FormInput placeholder="Password" label="Password" name="password" />
        <Button className={styles.loginButton} type="submit">
          Create
        </Button>
      </ValidatedForm>
    </div>
  );
};

export default CreateCustomerForm;
