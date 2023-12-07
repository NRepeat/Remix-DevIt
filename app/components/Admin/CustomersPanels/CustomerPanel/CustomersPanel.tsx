import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import { SearchBar } from "~/components/Header/SearchBar/SearchBar";
import Pagination from "~/components/Pagination/Pagination";
import type { CRUDPanelProps } from "../../CRUD/CRUDPanel";
import CustomerList from "../CustomerList/CustomerList";
import styles from "./styles.module.css";

const CustomersPanel: FC<SerializeFrom<CRUDPanelProps>> = ({
  data,
  currentPage,
}) => {
  const breadcrumbs = [{ label: "Customers", link: "/admin/customers" }];
  return (
    <div className={styles.customersPanel}>
      <div className={styles.head}>
        <Breadcrumbs breadcrumbs={breadcrumbs} admin={true} />
      </div>
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
