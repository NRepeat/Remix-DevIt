import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'
import { ProductData } from '~/services/product.server'
import styles from "./styles.module.css";
import Pagination from '~/components/Admin/CustomersPanels/Pagination/Pagination';

export interface ProductListProps{
data:ProductData
} 

const ProductList:FC<SerializeFrom<ProductListProps>> = ({data}) => {
  
  return (
    <>
       <ul className={styles.list}>{data.products.map((product)=>
      
      <li key={product.id} className={styles.product}>
      <p className={styles.id}>ID: {product.id}</p>
      <p className={styles.title}>{product.title}</p>
      <p className={styles.stock}>Stock:{product.stock}</p>
      <button>Add to cart</button>

      </li>
      )}</ul>
      <Pagination currentPage={data.page!} totalPages={data.totalPages!}/>
    </>
 
  )
}

export default ProductList