import type { SerializeFrom } from "@remix-run/node";
import { Form, Link, useFetcher } from "@remix-run/react";
import type { FC} from "react";
import { useEffect, useState } from "react";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import styles from "./styles.module.css";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";

export interface EditCustomerPanelProps {
  customer: CustomerWithoutPassword;
}

const EditCustomerPanel: FC<SerializeFrom<EditCustomerPanelProps>> = ({
  customer,
}) => {
  const fetcher = useFetcher();
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
        <Link className={styles.link} to={"/admin/customers/"}>Close</Link>
      </div>

      <fetcher.Form
        className={styles.form}
        action="/admin/customer/update"
        method="post"
      >
        <div className={styles.inputs}>
          <p>Customer's Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <p>Customer's Second Name</p>
          <input
            type="text"
            name="secondName"
            placeholder="Second name"
            value={formData.secondName}
            onChange={handleChange}
            required
          />

          <p>Customer's email</p>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input type="hidden" name="id" value={formData.id} />
        </div>

        <div className={styles.buttons}>
          <button type="submit">Submit</button>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default EditCustomerPanel;
