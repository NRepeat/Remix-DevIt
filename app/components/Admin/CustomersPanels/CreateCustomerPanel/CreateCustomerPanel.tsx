import { Link } from "@remix-run/react";
import type { FC } from "react";
import CreateCustomerForm from "~/components/Admin/CustomersPanels/CreateCustomerPanel/CreateCustomerForm/CreateCustomerForm";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import styles from "./styles.module.css";
const CreateCustomerPanel: FC = () => {
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: `Create` },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Create form
        <Link className={styles.link} to={"/admin/customers/"}>
          Close create form
        </Link>
      </div>
      <CreateCustomerForm />
    </>
  );
};

export default CreateCustomerPanel;
