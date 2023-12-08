import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
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

  return (
    <div className={styles.md}>
      <div className={styles.editCustomerPanel}>
        <div className={styles.head}>
          <h2>Edit {customer.name}</h2>
          <Link className={styles.link} to={"/admin/crud/customers/"}>
            x
          </Link>
        </div>
        <EditForm
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EditCustomerPanel;
