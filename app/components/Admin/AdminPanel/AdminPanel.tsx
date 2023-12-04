import { Cart} from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { FC } from "react";
import { CustomerWithoutPassword } from "~/services/customer.server";

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
