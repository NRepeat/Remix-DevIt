import type { FC } from "react";
import { ValidatedForm } from "remix-validated-form";
import { FormInput } from "~/components/Ui/Form/FormControl/ControlledInput/FormInput";
import { SubmitButton } from "~/components/Ui/Form/FormSubmit/FormSubmit";
import { editSchema } from "~/utils/formValidation";
import styles from "./styles.module.css";
type PersonalInformationFormProps = {
  defaultCustomerValues: {
    name: string;
    lastName: string;
    email: string;
    id: number;
  };
};

const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
  defaultCustomerValues,
}) => {
  return (
    <ValidatedForm
      className={styles.form}
      method="post"
      validator={editSchema}
      defaultValues={defaultCustomerValues}
    >
      <p className={styles.title}>Personal information</p>
      <div className={styles.name}>
        <FormInput
          name="name"
          label="First Name"
          type="text"
          placeholder="First Name"
        />
        <FormInput
          name="lastName"
          label="Second Name"
          type="text"
          placeholder="Second Name"
        />
      </div>
      <FormInput
        name="email"
        label="E-mail address"
        placeholder="E-mail address"
        type="email"
      />
      <FormInput name="id" value={1} type="hidden" />
      <SubmitButton>Save</SubmitButton>
    </ValidatedForm>
  );
};

export default PersonalInformationForm;
