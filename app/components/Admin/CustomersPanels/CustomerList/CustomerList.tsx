import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import { Input } from "~/components/Input/Input";
import type { CRUDPanelProps } from "../../CRUD/CRUDPanel";
import ButtonContainer from "./ButtonContainer/ButtonContainer";
import styles from "./styles.module.css";

const CustomerList: FC<SerializeFrom<CRUDPanelProps>> = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <td className={styles.checkbox}>
            <Input type="checkbox" name="id" id="selectAll" />
          </td>
          <td>Name</td>
          <td>Created at</td>
          <td>Cart</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        {data.customers.customers.map((customer) => (
          <tr key={customer.id} className={styles.info}>
            <td>
              <Input type="checkbox" name="id" id={`checkbox-${customer.id}`} />
            </td>
            <td>
              <p className={styles.bold}>
                {customer.name} {customer.secondName}
              </p>
              {customer.email}
            </td>
            <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
            <td>{customer.cart?.id}</td>
            <td>
              <ButtonContainer customer={customer} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
