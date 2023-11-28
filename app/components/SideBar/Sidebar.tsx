import { FC } from "react";
import invariant from "tiny-invariant";
import CategoriesList from "../CategoriesList/CategoriesList";
import { Category } from "@prisma/client";


export interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC<SidebarProps> = ({ categories }) => {
  return <CategoriesList categories={categories} />
};

export default Sidebar;
