import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import React from "react";
import styles from "../styles.module.css";
const AdminError = ({error}) => {
console.log("🚀 ~ file: AdminError.tsx:5 ~ AdminError ~ error:", error)

    return (
      <div className={styles.error}>
        <h2>{error.status}</h2>
        <p>{error.data}</p>
      </div>
    );
  
};

export default AdminError;
