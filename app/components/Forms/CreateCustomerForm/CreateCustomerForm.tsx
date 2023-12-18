import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/ContolledInput/FormInput";
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
        <FormInput label="Name" name="name" />
        <FormInput label="Last Name" name="lastName" />
        <FormInput label="Email" name="email" />
        <FormInput label="Password" name="password" />
        <div className={styles.containerB}>
          <Button type="submit">Sign up</Button>
        </div>
      </ValidatedForm>
    </div>
  );
};

export default CreateCustomerForm;
