import React from 'react'
import styles from "../styles.module.css";
import { Link, useSubmit } from '@remix-run/react';
import { CustomerWithoutPassword } from '~/services/customer.server';
import { SerializeFrom } from '@remix-run/node';
import clsx from 'clsx';


export interface  ButtonContainerProps{
customer: CustomerWithoutPassword
}

const ButtonContainer:React.FC<SerializeFrom<ButtonContainerProps> > = ({customer}) => {
  const submit = useSubmit();
  const handleSubmit = (id: number) => {
    confirm(`Confirm delete customer ${id}`) ? submit({ id }, { method: "post", action: `/admin/customer/delete` }) : null}
  const handleCartCreate = (id: number) => {
    submit({}, { action: `/admin/customers/customer/${id}/cart/create`, method: "post" })
  }
  return (
    <div className={styles.buttonContainer}>
      <Link className={clsx(styles.button,styles.edit)} to={`customer/${customer.id}/edit`}>Edit</Link>

      {customer.cart?.id ? <Link className={clsx(styles.button,styles.cart)} 
      to={`/admin/customers/customer/${customer.id}/cart`}>Cart</Link> :
      <button className={clsx(styles.button,styles.cart)} onClick={() => handleCartCreate(customer.id)} >Create cart</button>}
      <button className={clsx(styles.button,styles.delete)} onClick={() => handleSubmit(customer.id)}>Delete</button>
    </div>
  )
}

export default ButtonContainer