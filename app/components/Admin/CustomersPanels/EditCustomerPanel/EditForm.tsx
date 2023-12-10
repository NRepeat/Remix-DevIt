import type { FC } from "react";
import { Button } from "~/components/Button/Button";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";
import type { HandleArgs } from "./HandelChange";
import styles from "./styles.module.css";

type FormProps = {
  formData: {
    name: string;
    secondName: string;
    email: string;
    id: number;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      secondName: string;
      email: string;
      id: number;
    }>
  >;
  handleChange: ({ e, setFormData }: HandleArgs) => void;
};

const EditForm: FC<FormProps> = ({ formData, setFormData, handleChange }) => {
  return (
    <FormM
      action="/admin/customers/customer/update"
      method="post"
      isFetcher={true}
    >
      <div className={styles.field}>
        <p> Name</p>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />
      </div>
      <div className={styles.field}>
        <p>Last Name</p>
        <Input
          type="text"
          name="secondName"
          placeholder="Last Name"
          value={formData.secondName}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />
      </div>
      <div className={styles.field}>
        <p>Email</p>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />
      </div>

      <Input type="hidden" name="id" value={formData.id} />

      <Button className={styles.button} type="submit">
        Submit
      </Button>
    </FormM>
  );
};

export default EditForm;
