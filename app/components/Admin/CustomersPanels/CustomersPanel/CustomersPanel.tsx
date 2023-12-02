import { FC } from "react";
import { AdminPanelProps } from "../../AdminPanel/AdminPanel";
import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import CustomerList from "./CustomerList/CustomerList";
import { CustomerSearch } from "./CustomerSearch/CustomerSearch";
import Pagination from "./Pagination/Pagination";

const CustomersPanel: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {
  return (
    <>
      <div>Customers</div>
      {data.customers.customers && (
        <>
          <Link to={"/admin/customers/customer/create"}>Add Customers</Link>
          <CustomerSearch />
          <CustomerList data={data} />
          <Pagination currentPage={1} totalPages={data.customers.totalPages}/>
        </>
      )}
    </>
  );
};

export default CustomersPanel;
