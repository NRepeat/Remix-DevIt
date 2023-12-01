import { Cart, CartItem } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React, { FC } from "react";
import { loader } from "~/routes/admin.customers_.customer_.$id.cart";




const ItemsList:FC<SerializeFrom<typeof loader>> = ({cart}) => {
  return (
    <div>
      <ul>
        {cart?.cartItems.map((item) => (
          <li>
            {item.product.title} {item.quantity} <Link to={"edit"}>Edit</Link>
            <Link to={"delete"}>Delete</Link>
          </li>
        ))}
      </ul>
      <Link to={"/admin/customers/"}>Close</Link>
    </div>
  );
};

export default ItemsList;
