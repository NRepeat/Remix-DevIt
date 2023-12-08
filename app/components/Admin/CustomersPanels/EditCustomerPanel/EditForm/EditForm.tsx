import { Form } from "@remix-run/react";
import type { FC } from "react";
import { Button } from "~/components/Button/Button";
import { Input } from "~/components/Input/Input";
import type { HandleArgs } from "../HeandelChange";
import styles from "../styles.module.css";

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
    <Form className={styles.form} action="/admin/customer/update" method="post">
      <div className={styles.inputs}>
        <p>Customer's Name</p>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />
        <p>Customer's Second Name</p>
        <Input
          type="text"
          name="secondName"
          placeholder="Second name"
          value={formData.secondName}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />

        <p>Customer's email</p>

        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange({ e, setFormData })}
          required
        />
        <Input type="hidden" name="id" value={formData.id} />
      </div>

      <div className={styles.buttons}>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default EditForm;
