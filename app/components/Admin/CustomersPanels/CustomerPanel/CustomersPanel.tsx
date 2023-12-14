import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";

import type { CustomerWithoutPassword } from "~/services/customer.server";
import CustomersTable from "../CustomersTable/CustomersTable";
import styles from "./styles.module.css";

type CustomersPanelProp = {
  customers: CustomerWithoutPassword[];
};

const CustomersPanel: FC<SerializeFrom<CustomersPanelProp>> = ({
  customers,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {customers.length > 0 ? (
            <div className={styles.tableWrapper}>
              <CustomersTable customers={customers} />
            </div>
          ) : (
            <p className={styles.notFound}>Customers not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomersPanel;
