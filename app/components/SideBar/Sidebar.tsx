import { FC } from "react";
import invariant from "tiny-invariant";
import CategoriesList from "../CategoriesList/CategoriesList";
import { Category } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";


export interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC< SerializeFrom<SidebarProps>> = ({ categories }) => {
  return <CategoriesList categories={categories} />
};

export default Sidebar;
