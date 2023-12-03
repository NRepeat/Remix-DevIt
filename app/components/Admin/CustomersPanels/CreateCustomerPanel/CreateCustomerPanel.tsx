import { Form, Link } from "@remix-run/react";
import styles from "./styles.module.css";
import  { FC } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
const CreateCustomerPanel: FC = () => {
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: "Create customer", link: "/admin/customers/customer/create" },
  ];
  return (
    <div className={styles.customerPanel}>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <Form action={`/admin/customer/action/create`} method="post">
        <input type="text" name="name" required />
        <input type="text" name="secondName" required />
        <input type="text" name="email" required />
        <input type="password" name="password" required />
        <button type="submit">Submit</button>
      </Form>
      <Link to={'/admin/customers/'}>Close</Link>
    </div>
  );
};

export default CreateCustomerPanel;
