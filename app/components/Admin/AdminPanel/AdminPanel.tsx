import { Customer } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { FC } from "react";
import { CustomerWithoutPassword } from "~/services/customer.server";
import CustomersPanel from "../CustomersPanels/CustomersPanel/CustomersPanel";

export interface AdminPanelProps {
  customers: CustomerWithoutPassword[];
}

const AdminPanel: FC<SerializeFrom<AdminPanelProps>> = ({ customers }) => {
  return (
    <>
     
    </>
  );
};

export default AdminPanel;
