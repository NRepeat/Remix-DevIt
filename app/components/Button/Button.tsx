import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import type { FC } from "react";
import styles from "./styles.module.css";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>
    {children}
  </button>
);

// type Props = {
//   children: React.ReactNode;
//   onSubmit?: () => void;
//   onClick?: () => void;
//   disabled?: boolean;
//   type?: "button" | "submit" | "reset";
//   className?: string;
// };

// export const Button: FC<Props> = ({
//   children,
//   onSubmit,
//   onClick,
//   disabled = false,
//   type = "button",
//   className,
// }) => {
//   return (
//     <button
//       className={clsx(className)}
//       type={type}
//       onSubmit={onSubmit}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };
