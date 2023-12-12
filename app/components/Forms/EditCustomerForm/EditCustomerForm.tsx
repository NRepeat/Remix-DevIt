import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/FormInput";
import { editSchema } from "~/utils/formValidation";
import styles from "./styles.module.css";
type FormProps = {
  formData: {
    name: string;
    secondName: string;
    email: string;
    id: number;
  };

  classNames?: string;
};

const EditCustomerForm: FC<FormProps> = ({ formData }) => {
  return (
    <ValidatedForm
      method="post"
      validator={editSchema}
      defaultValues={{
        name: formData.name,
        email: formData.email,
        lastName: formData.secondName,
      }}
      className={styles.form}
    >
      <FormInput label="Name" name="name" />
      <FormInput label="Last Name" name="lastName" />
      <FormInput label="Email" name="email" />

      <Button className={styles.loginButton} type="submit">
        Save
      </Button>
    </ValidatedForm>
  );
};
export default EditCustomerForm;
