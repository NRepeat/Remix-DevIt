import { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import { FC } from "react";
import { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel";
import styles from "./styles.module.css";
import ButtonContainer from "./ButtonContainer/ButtonContainer";


const CustomerList: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {

  return (
  <div>
   <div className={styles.head}>
        <p>ID</p>
        <p>Name</p>
        <p>Second Name</p>
        <p>Email</p>
        <p className={styles.action}>Action</p>
      </div>
      <div  className={styles.body}>
        {data.customers.customers.map((customer) => (
          <div className={styles.info}>
            <p>{customer.id}</p>
            <p>{customer.name}</p>
            <p>{customer.secondName}</p>
            <p>{customer.email}</p>
            <ButtonContainer  customer={customer}/>
          </div>
        ))}
      </div>

  </div>
     

  );
};

export default CustomerList;
