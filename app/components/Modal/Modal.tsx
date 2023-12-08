import type { FC } from 'react';
import React from 'react';
import styles from "./styles.module.css";

type ModalProps = {
  children: React.ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className={styles.modal}>{children}</div>
  )
}

export default Modal