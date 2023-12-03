import { SerializeFrom } from "@remix-run/node";
import { Form, Link, useFetcher } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import { CustomerWithoutPassword } from "~/services/customer.server";
import styles from "./styles.module.css";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";

export interface EditCustomerPanelProps {
  customer: CustomerWithoutPassword;
}

const EditCustomerPanel: FC<SerializeFrom<EditCustomerPanelProps>> = ({
  customer,
}) => {
  const fetcher = useFetcher()
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
    { label: `Edit customer ${customer.name}`, link: `/admin/customers/customer/${customer.id}/edit` },
  ];
  return (
    <div className={styles.editCustomerPanel}>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
     
      <fetcher.Form action="/admin/customer/action/update" method="post">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        Second Name
        <input
          type="text"
          name="secondName"
          placeholder="Second Name"
          required
          value={formData.secondName}
          onChange={handleChange}
        />
        Email
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input type="hidden" name="id" value={formData.id} />
        <button type="submit">Submit</button>
      </fetcher.Form>
      <Form action="/admin/customer/action/delete " method="post">
        <input type="hidden" name="id" value={customer.id} />
        <button type="submit">Delete</button>
        <Link to={'/admin/customers'}>Close </Link>
      </Form>
    </div>
  );
};

export default EditCustomerPanel;
