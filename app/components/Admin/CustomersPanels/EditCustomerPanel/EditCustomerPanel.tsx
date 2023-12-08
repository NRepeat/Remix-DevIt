import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import EditForm from "./EditForm/EditForm";
import { handleChange } from "./HeandelChange";
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
    {
      label: `Edit customer ${customer.name}`,
      link: `/admin/customers/customer/${customer.id}/edit`,
    },
  ];

  return (
    <div className={styles.editCustomerPanel}>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
        <Link className={styles.link} to={"/admin/customers/"}>
          Close
        </Link>
      </div>
      <EditForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default EditCustomerPanel;
