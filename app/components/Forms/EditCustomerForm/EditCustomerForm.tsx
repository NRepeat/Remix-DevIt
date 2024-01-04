import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { Button } from "~/components/Ui/Button/Button";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
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
        <FormInput placeholder="Name" label="Name" name="name" />
        <FormInput placeholder="Last Name" label="Last Name" name="lastName" />
        <FormInput
          placeholder="Email"
          type="email"
          label="Email"
          name="email"
        />
        <FormInput type="hidden" value={formData.id} name="id" />

        <Button className={styles.loginButton} type="submit">
          Save
        </Button>
      </ValidatedForm>
    </div>
  );
};
export default EditCustomerForm;
