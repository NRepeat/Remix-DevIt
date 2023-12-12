import { useClickOutside, useToggle } from "@reactuses/core";
import clsx from "clsx";
import type { FC } from "react";
import React, { useRef } from "react";
import styles from "./styles.module.css";

type ModalProps = {
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ children }) => {
  const ref = useRef(null);
  const [on, toggle] = useToggle(true);
  useClickOutside(ref, () => toggle(false));
  return (
    <div className={clsx(styles.modal, { [styles.close]: on })}>
      {" "}
      <div ref={ref}> {children}</div>{" "}
    </div>
  );
};

export default Modal;
