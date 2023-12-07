import type { Cart } from "@prisma/client";
import type { FC } from "react";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import styles from "./styles.module.css";

export interface CRUDPanelProps {
  data: {
    customers: {
      customers: CustomerWithoutPassword[] & { cart: Cart };
      totalPages: number;
    };
  };
  currentPage?: number;
}

type Props = {
  children: React.ReactNode;
  data?: {};
};

const CRUDPanel: FC<Props> = ({ children, data }) => {
  return <div className={styles.panel}> {children}</div>;
};

export default CRUDPanel;
