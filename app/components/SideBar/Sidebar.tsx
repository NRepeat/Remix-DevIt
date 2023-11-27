import { FC } from "react";
import invariant from "tiny-invariant";
import CategoriesList from "../CategoriesList/CategoriesList";


export interface SidebarProps {
  categories: string[];
}

const Sidebar:FC<SidebarProps> = ({ categories }) => {
  
  invariant(categories, "missing data");
  return (
      <CategoriesList categories={categories} />
  );
};

export default Sidebar;
