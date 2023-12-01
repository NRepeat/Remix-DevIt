import { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import React, { FC } from "react";
import { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel";

const CustomerList: FC<SerializeFrom<AdminPanelProps>> = ({ customers }) => {
  const submit = useSubmit();
  const handleSubmit = (id: number) => {
    submit({}, { action: `customer/${id}` });
  };

  return (
    <ul>
      <div>Name Email Role Type Status</div>

      {customers.map((customer) => (
        <>
          <li>
            {customer.id} {customer.name} {customer.secondName} {customer.email}
          </li>
          <button onClick={() => handleSubmit(customer.id)}>Edit</button>
          <button>Delete</button>
          <Link to={`/admin/customers/customer/${customer.id}/cart`}>Cart</Link>
        </>
      ))}
    </ul>
  );
};

export default CustomerList;
