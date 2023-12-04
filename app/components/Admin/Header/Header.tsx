import React from 'react'
import styles from "./styles.module.css";



const Header:React.FC = () => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Admin Panel</h2>
    </div>
  )
}

export default Header