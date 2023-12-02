import { FC } from "react";
import { AdminPanelProps } from "../../AdminPanel/AdminPanel";
import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import CustomerList from "./CustomerList/CustomerList";
import { CustomerSearch } from "./CustomerSearch/CustomerSearch";

const CustomersPanel: FC<SerializeFrom<AdminPanelProps>> = ({ customers }) => {
  return (
    <>
      <div>Customers</div>
      {customers && (
        <>
          <Link to={"/admin/customers/customer/create"}>Add Customers</Link>
          <CustomerSearch />
          <CustomerList customers={customers} />
          <div>Pagination</div>
        </>
      )}
    </>
  );
};

export default CustomersPanel;
