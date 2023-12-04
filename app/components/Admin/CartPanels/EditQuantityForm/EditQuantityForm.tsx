import { Form } from '@remix-run/react'
import { Quantities } from '../ItemsList/ItemsList'
import React from 'react'



export interface  EditQuantityFormProps{
  item:{
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
},
  quantities:Quantities,
  customerId:number,
  handleChange: (itemId: number, e: React.ChangeEvent<HTMLInputElement>)=>void

}


const EditQuantityForm: React.FC<EditQuantityFormProps>= ({item,quantities,customerId,handleChange}) => {
  return (
    <>
    
      <p>Edit quantity</p>
      
      <input
        onChange={(e) => handleChange(item.id, e)}
        type="text"
        value={quantities[item.id] || item.quantity.toString()}
      />
      <Form action={`/admin/customers/customer/${customerId}/cart/action/editQuantity`} method="post">
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="quantity" value={quantities[item.id] || item.quantity} />
        <button type="submit" >
          Save
        </button>
      </Form>
    </>
  )
}

export default EditQuantityForm