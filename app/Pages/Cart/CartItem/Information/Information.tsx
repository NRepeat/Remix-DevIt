import type { FC } from "react";
import type { CartItemProps } from "../CartItem";

const Information: FC<CartItemProps> = ({ item }) => {
  return (
    <div>
      <img src={item.product.thumbnail} alt={item.product.title} />
      <h3>{item.product.title}</h3>
      <p>{item.product.rating}</p>
      <p>{item.product.stock > 0 ? "In Stock" : "Out of stock"}</p>
      <div>
        <p>Each</p>
        <span>
          {(item.product.price * item.product.discountPercentage) / 100}
        </span>
      </div>
    </div>
  );
};

export default Information;
