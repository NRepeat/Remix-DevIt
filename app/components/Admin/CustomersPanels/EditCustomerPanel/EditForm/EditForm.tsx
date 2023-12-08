import { useFetcher } from "@remix-run/react";
import type { FC } from "react";
import { Button } from "~/components/Button/Button";
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
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      className={styles.form}
      action="/admin/customer/update"
      method="post"
    >
      <div className={styles.inputs}>
        <div className={styles.field}>
          <p> Name</p>
          <input
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
          <input
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

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange({ e, setFormData })}
            required
          />
        </div>

        <input type="hidden" name="id" value={formData.id} />
      </div>

      <Button className={styles.button} type="submit">
        Submit
      </Button>
    </fetcher.Form>
  );
};

export default EditForm;
