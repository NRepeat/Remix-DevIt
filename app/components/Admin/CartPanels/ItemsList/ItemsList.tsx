import { SerializeFrom } from "@remix-run/node";
import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
import React, { FC, useState } from "react";
import { loader } from "~/routes/admin.customers_.customer_.$id.cart";
import { updateCartItem } from "~/services/cartItem.server";

interface ItemsListProps extends SerializeFrom<typeof loader> { }

const ItemsList: FC<ItemsListProps> = ({ cart, customerId }) => {
  const fetcher = useFetcher();
  const submit = useSubmit()
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [toggleEdit, setToggleEdit] = useState(false);



  const handleChange = (itemId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  return (
    <div>
      <ul>
        <button onClick={() => setToggleEdit((prevToggle) => !prevToggle)}>Edit</button>
        {cart?.cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.product.title}</p>
            <p>
              {toggleEdit ? (
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
              ) : (
                <span>
                  <p>Quantity</p>
                  {item.quantity}
                </span>
              )}
            </p>
            <button onClick={()=>submit({id:item.id},{action:`/admin/customers/customer/${customerId}/cart/action/delete`,method:"post"})}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to={"/admin/customers/"}>Close</Link>
    </div>
  );
};

export default ItemsList;
