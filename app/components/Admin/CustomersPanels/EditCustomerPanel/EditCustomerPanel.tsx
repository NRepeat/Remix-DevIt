import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import EditCustomerForm from "~/components/Forms/EditCustomerForm/EditCustomerForm";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import styles from "./styles.module.css";
export interface EditCustomerPanelProps {
  customer: CustomerWithoutPassword;
}

const EditCustomerPanel: FC<SerializeFrom<EditCustomerPanelProps>> = ({
  customer,
}) => {
  const [formData, setFormData] = useState({
    name: customer.name,
    secondName: customer.secondName,
    email: customer.email,
    id: customer.id,
  });
  useEffect(() => {
    setFormData({
      name: customer.name,
      secondName: customer.secondName,
      email: customer.email,
      id: customer.id,
    });
  }, [customer]);
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },
    { label: `${customer.name}`, link: "/admin/customers" },
    { label: `Edit`, link: "" },
  ];
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Edit form
        <Link className={styles.link} to={"/admin/customers/"}>
          Close edit form
        </Link>
      </div>
      <div className={styles.wrapper}>
        <EditCustomerForm formData={formData} />
      </div>
    </>
  );
};

export default EditCustomerPanel;
