import type { FC } from "react";
import type { AdminPanelProps } from "../../AdminPanel/AdminPanel";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "./styles.module.css";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import CustomerList from "../CustomerList/CustomerList";
import { SearchBar } from "~/components/Header/SearchBar/SearchBar";
import Pagination from "~/components/Pagination/Pagination";

const CustomersPanel: FC<SerializeFrom<AdminPanelProps>> = ({
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
