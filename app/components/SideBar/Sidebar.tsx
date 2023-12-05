import type { FC } from "react";
import invariant from "tiny-invariant";
import CategoriesList from "../CategoriesList/CategoriesList";
import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";


export interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC< SerializeFrom<SidebarProps>> = ({ categories }) => {
  return <CategoriesList categories={categories} />
};

export default Sidebar;
