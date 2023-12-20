import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
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
        <FormInput type="text" placeholder="Name" label="Name" name="name" />
        <FormInput
          type="text"
          placeholder="Last Name"
          label="Last Name"
          name="lastName"
        />
        <FormInput
          type="email"
          placeholder="Email"
          name="email"
          label="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          label="password"
        />
        <div className={styles.buttonContainer}>
          <SubmitButton>Create</SubmitButton>
          <div className={styles.bgButton}></div>
        </div>
      </ValidatedForm>
    </div>
  );
};

export default CreateCustomerForm;
