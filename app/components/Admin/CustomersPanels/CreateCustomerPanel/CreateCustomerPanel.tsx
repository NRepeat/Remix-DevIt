import { Form, Link } from "@remix-run/react";
import styles from "./styles.module.css";
import { FC, useRef } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
const CreateCustomerPanel: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: "Create customer", link: "/admin/customers/customer/create" },
  ];
  return (
    <div className={styles.addPanel}>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
        <Link className={styles.link} to={"/admin/customers/"}>Close</Link>
      </div>

      <Form
      ref={formRef}
        className={styles.form}
        action={`/admin/customer/create`}
        method="post"
      >
        <div className={styles.inputs}>
          <p>Customer's Name</p>
          <input type="text" name="name" placeholder="Name" required />
          <p>Customer's Second Name</p>
          <input
            type="text"
            name="secondName"
            placeholder="Second name"
            required
          />
          <p>Customer's email</p>

          <input type="text" name="email" placeholder="Email" required />
          <p>Customer's password</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div className={styles.buttons}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCustomerPanel;
