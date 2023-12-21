import type { Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import clsx from "clsx";
import type { FC } from "react";
import styles from "./styles.module.css";
type Props = {
  product: SerializeFrom<Product>;
  handleChangeImgIndex: (i: number) => void;
  imageIndex: number;
};

const ProductImages: FC<Props> = ({
  product,
  handleChangeImgIndex,
  imageIndex,
}) => {
  return (
    <div className={styles.container}>
      {product.images.map((img, i) => (
        <img
          onClick={() => handleChangeImgIndex(i)}
          className={clsx(styles.img, { [styles.active]: imageIndex === i })}
          key={i}
          src={img}
          alt="img"
        />
      ))}
    </div>
  );
};

export default ProductImages;
