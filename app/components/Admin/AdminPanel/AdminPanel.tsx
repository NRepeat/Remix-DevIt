import type { Cart } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { CustomerWithoutPassword } from "~/services/customer.server";

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
