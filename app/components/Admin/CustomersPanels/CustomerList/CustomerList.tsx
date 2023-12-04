import { SerializeFrom } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import  { FC } from "react";
import { AdminPanelProps } from "~/components/Admin/AdminPanel/AdminPanel";
import styles from "./styles.module.css";


const CustomerList: FC<SerializeFrom<AdminPanelProps>> = ({ data }) => {
  const submit = useSubmit();
  const handleSubmit = (id:number) => {

    confirm(`Confirm delete customer ${id}`) ? submit({ id }, { method: "post", action: `/admin/customer/delete` }) : null

  }
const handleCartCreate = (id:number)=>{
submit({},{action:`/admin/customers/customer/${id}/cart/create`,method: "post"})
}
  return (
    <table className={styles.table}>
      <thead className={styles.table}>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Second Name</th>
          <th>Email</th>
          <th className={styles.action}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.customers.customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.secondName}</td>
            <td>{customer.email}</td>
            <td className={styles.buttonContainer}>
              <Link className={styles.edit} to={`customer/${customer.id}/edit`}>Edit</Link>
              {customer.cart?.id ?   <Link className={styles.cart} to={`/admin/customers/customer/${customer.id}/cart`}>Cart</Link> : <button className={styles.cart} onClick={()=>handleCartCreate(customer.id)} >Create cart</button> }
              <button className={styles.delete} onClick={()=>handleSubmit(customer.id) }>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
