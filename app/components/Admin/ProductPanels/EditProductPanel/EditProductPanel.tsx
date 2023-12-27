import type { Category, Product } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState, type FC } from "react";
import Breadcrumbs from "~/components/Ui/Breadcrumbs/Breadcrumbs";
import { Button } from "~/components/Ui/Button/Button";
import EditProductForm from "./EditProductForm/EditProductForm";
import styles from "./styles.module.css";
export interface EditProductPanelProps {
  product: SerializeFrom<Product & { category: Category }>;
}

const EditProductPanel: FC<EditProductPanelProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    thumbnail: product.thumbnail,
    title: product.title,
    description: product.description,
    category: product.category,
    rating: product.rating,
    stock: product.stock,
  });
  useEffect(() => {
    setFormData({
      thumbnail: product.thumbnail,
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={styles.title}>
        Edit form
        <Button onClick={handleBack} className={styles.link}>
          Close edit form
        </Button>
      </div>
      <EditProductForm formData={formData} />
    </>
  );
};

export default EditProductPanel;
