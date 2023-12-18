import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/ContolledInput/FormInput";
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
    <div className={styles.container}>
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
        <FormInput label="Password" name="password" />
        <div className={styles.containerB}>
          <Button className={styles.loginButton} type="submit">
            Save
          </Button>
        </div>
      </ValidatedForm>
    </div>
  );
};
export default EditCustomerForm;
