import { Link } from "@remix-run/react";
import type { FC } from "react";
import CreateCustomerForm from "~/components/Admin/CustomersPanels/CreateCustomerPanel/CreateCustomerForm/CreateCustomerForm";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import styles from "./styles.module.css";
const CreateCustomerPanel: FC = () => {
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: `Create`, link: "" },
  ];
  return (
    <>
      <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Create form
        <Link className={styles.link} to={"/admin/customers/"}>
          Close create form
        </Link>
      </div>
      <div className={styles.wrapper}>
        <CreateCustomerForm />
      </div>
    </>
  );
};

export default CreateCustomerPanel;
