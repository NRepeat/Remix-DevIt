import type { FC } from "react";
import styles from "./styles.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainLayout;
