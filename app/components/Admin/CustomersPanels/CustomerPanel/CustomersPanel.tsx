import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import Pagination from "~/components/Store/Pagination/Pagination";
import { SearchBar } from "~/components/StoreHeader/SearchBar/SearchBar";
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
        <div className={styles.container}>
          <div>
            <div className={styles.searchContainer}>
              <SearchBar action="/admin/customers/" />
              <Link to={"/admin/customers/customer/create"}>
                Create customer
              </Link>
            </div>
            <div className={styles.listContainer}>
              <CustomerList data={data} />
            </div>
          </div>

          <Pagination
            admin={true}
            currentPage={currentPage!}
            totalPages={data.customers.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default CustomersPanel;
