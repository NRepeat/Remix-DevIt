import type { FC } from "react";
import styles from "./styles.module.css";

import { Button } from "~/components/Button/Button";
import FormM from "~/components/Form/FormM";
import { Input } from "~/components/Input/Input";

type FormProps = {};

const CreateForm: FC<FormProps> = () => {
  return (
    <FormM
      isFetcher={false}
      className={styles.form}
      action={`/admin/customer/create`}
      method="post"
    >
      <div className={styles.inputs}>
        <div className={styles.field}>
          <p>Customer's Name</p>
          <Input type="text" name="name" placeholder="Name" required />
        </div>
        <div className={styles.field}>
          <p>Customer's Second Name</p>
          <Input
            type="text"
            name="secondName"
            placeholder="Second name"
            required
          />
        </div>
        <div className={styles.field}>
          <p>Customer's email</p>

          <Input type="text" name="email" placeholder="Email" required />
        </div>
        <div className={styles.field}>
          <p>Customer's password</p>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
      </div>

      <Button className={styles.button} type="submit">
        Submit
      </Button>
    </FormM>
  );
};

export default CreateForm;
