import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React, { FC } from "react";
import { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel";

const CustomerList: FC<SerializeFrom<AdminPanelProps>> = ({ customers }) => {
  return (
    <ul>
      <div>Name Email Role Type Status</div>

      {customers.map((customer) => (
        <>
          <li>
            <Link key={customer.id} to={`customer/${customer.id}`}>
              {customer.name} {customer.secondName} {customer.email}
            </Link>
          </li>
          <button>Edit</button>
          <button>Delete</button>
        </>
      ))}
    </ul>
  );
};

export default CustomerList;
