import { FC } from "react";
import { AdminPanelProps } from "../../AdminPanel/AdminPanel";
import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CustomerSearch } from "../CustomerSearch/CustomerSearch";
import Pagination from "../Pagination/Pagination";
import styles from "./styles.module.css";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import CustomerList from "../CustomerList/CustomerList";


const CustomersPanel: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {
  const breadcrumbs = [
    { label: "Customers", link: "/admin/customers" },

  ];
  return (
    <div className={styles.customersPanel}>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      {data.customers.customers && (
        <div className={styles.customerListContainer} >
          <div className={styles.searchContainer}>
          <CustomerSearch />
          <Link to={"/admin/customers/customer/create"}>Add Customer</Link>
      
          </div>
   
          <CustomerList data={data} />
          <Pagination currentPage={1} totalPages={data.customers.totalPages}/>
        </div>
      )}
    </div>
  );
};

export default CustomersPanel;
