import { Customer } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { FC, useState } from "react";
import { CustomerWithoutPassword } from "~/services/customer.server";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
       <Form action="/admin/customer/action/update" method="post" >
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
    </Form>
      <Form action="/admin/customer/action/delete " method="post">
        <input type="hidden" name="id" value={customer.id} />
        <button type="submit">Delete</button>
      </Form>
    </>
  );
};

export default EditCustomerPanel;
