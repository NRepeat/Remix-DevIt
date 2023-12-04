import { Cart, Customer } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import { CustomerWithoutPassword } from "~/services/customer.server";
import CustomersPanel from "../CustomersPanels/CustomerPanel/CustomersPanel";

export interface AdminPanelProps {
  data: {
    customers: {
      customers: CustomerWithoutPassword[] & { cart: Cart };
      totalPages: number;
    };
  
  };
  currentPage?: number;
}

const AdminPanel: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {
  return <></>;
};

export default AdminPanel;
