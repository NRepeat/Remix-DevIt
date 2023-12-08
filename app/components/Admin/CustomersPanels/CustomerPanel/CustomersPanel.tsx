import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { SearchBar } from "~/components/Header/SearchBar/SearchBar";
import Pagination from "~/components/Store/Pagination/Pagination";
import type { CRUDPanelProps } from "../../CRUD/CRUDPanel";
import CustomerList from "../CustomerList/CustomerList";
import styles from "./styles.module.css";

const CustomersPanel: FC<SerializeFrom<CRUDPanelProps>> = ({
  data,
  currentPage,
}) => {
  return (
    <div className={styles.customersPanel}>
      {data.customers.customers && (
        <div className={styles.customerListContainer}>
          <div className={styles.searchContainer}>
            <SearchBar action="/admin/customers/" />
            <Link to={"/admin/customers/customer/create"}>Add Customer</Link>
          </div>
          <div className={styles.listContainer}>
            <CustomerList data={data} />
            <div>
              <Pagination
                admin={true}
                currentPage={currentPage!}
                totalPages={data.customers.totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPanel;
