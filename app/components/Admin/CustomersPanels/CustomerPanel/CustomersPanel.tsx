import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import Pagination from "~/components/Store/Pagination/Pagination";
import { SearchBar } from "~/components/StoreHeader/SearchBar/SearchBar";

import type { CustomerWithoutPassword } from "~/services/customer.server";
import CustomersTable from "../CustomersTable/CustomersTable";
import styles from "./styles.module.css";

type CustomersPanelProp = {
  customers: CustomerWithoutPassword[];
  totalPages: number;
  currentPage: number;
};

const CustomersPanel: FC<SerializeFrom<CustomersPanelProp>> = ({
  customers,
  currentPage,
  totalPages,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <SearchBar action="/admin/customers/" />
          <Link className={styles.link} to={"/admin/customers/customer/create"}>
            Create customer
          </Link>
        </div>

        {customers.length > 0 ? (
          <div className={styles.table}>
            <CustomersTable customers={customers} />
          </div>
        ) : (
          <p className={styles.notFound}>Customers not found</p>
        )}
      </div>
      <div className={styles.pagination}>
        <Pagination
          admin={true}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default CustomersPanel;
