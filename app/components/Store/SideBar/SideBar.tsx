import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";

import { useLocation } from "@remix-run/react";
import List from "./List";
import styles from "./styles.module.css";
export interface SidebarProps {
  links: {
    slug: string;
    name: string;
    path: string;
  }[];
}

const Sidebar: FC<SerializeFrom<SidebarProps>> = ({ links }) => {
  const navigation = useLocation();

  return (
    <nav className={styles.gridSidebar}>
      <List links={links} navigation={navigation} />
    </nav>
  );
};

export default Sidebar;
