import type { Category, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect, useState, type FC } from "react";
import Breadcrumbs from "~/components/Breadcrumbs/Breadcrumbs";
import EditProductForm from "./EditProductForm/EditProductForm";
import styles from "./styles.module.css";
export interface EditProductPanelProps {
  product: SerializeFrom<Product & { category: Category }>;
}

const EditProductPanel: FC<EditProductPanelProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    img: product.thumbnail,
    title: product.title,
    description: product.description,
    category: product.category,
    rating: product.rating,
    stock: product.stock,
  });
  useEffect(() => {
    setFormData({
      img: product.thumbnail,
      title: product.title,
      description: product.description,
      category: product.category,
      rating: product.rating,
      stock: product.stock,
    });
  }, [product]);
  const breadcrumbs = [
    { label: "Products", link: "/admin/products" },
    { label: `${product.title}`, link: "/admin/products" },
    { label: `Edit`, link: "" },
  ];
  return (
    <>
      <Breadcrumbs admin={true} breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Edit form
        <Link className={styles.link} to={"/admin/products"}>
          Close edit form
        </Link>
      </div>
      <div className={styles.wrapper}>
        <EditProductForm formData={formData} />
      </div>
    </>
  );
};

export default EditProductPanel;
