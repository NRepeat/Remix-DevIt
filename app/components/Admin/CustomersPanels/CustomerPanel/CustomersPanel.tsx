import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";

import { Link } from "@remix-run/react";
import Pagination from "~/components/Store/Pagination/Pagination";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { SearchBar } from "~/components/Ui/SearchBar/SearchBar";
import type { CustomerWithoutPassword } from "~/services/customer.server";
import CustomersTable from "../CustomersTable/CustomersTable";
import styles from "./styles.module.css";

type CustomersPanelProp = {
  data: SerializeFrom<{
    customers: {
      customers: CustomerWithoutPassword[];
      totalPages: number;
    };
    page: number;
  }>;
};
const breadcrumbs = [
  { label: "Home", link: "/" },
  { label: "Customers", link: "" },
];

const CustomersPanel: FC<SerializeFrom<CustomersPanelProp>> = ({ data }) => {
  const { customers, page } = data;
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className={styles.search}>
        <SearchBar action="/admin/customers/" />
        <Link className={styles.link} to={"/admin/customers/customer/create"}>
          Create customer
        </Link>
      </div>
      {customers.customers.length > 0 ? (
        <CustomersTable customers={customers.customers} />
      ) : (
        <p className={styles.notFound}>Customers not found</p>
      )}
      <Pagination
        admin={true}
        currentPage={page}
        totalPages={customers.totalPages}
      />
    </>
  );
};

export default CustomersPanel;
