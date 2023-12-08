import type { Product } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'
import type { FC } from 'react'
import styles from "./styles.module.css"
type Props = {
  product: Product
}

const ProductImages: FC<SerializeFrom<Props>> = ({ product }) => {
  return (
    <div className={styles.container}>{product.images.map((img, i) => <img className={styles.img} key={i} src={img} alt="img" />)}</div>
  )
}

export default ProductImages