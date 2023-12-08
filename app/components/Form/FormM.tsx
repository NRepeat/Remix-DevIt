import type { FormProps } from "@remix-run/react";
import { Form, useFetcher } from "@remix-run/react";
import clsx from "clsx";
import type { DetailedHTMLProps, FC, ReactNode } from "react";
import styles from "./styles.module.css";
export interface FormMProps
  extends DetailedHTMLProps<FormProps, HTMLFormElement> {
  children: ReactNode;
  className?: string;
  isFetcher: boolean;
}

const FormM: FC<FormMProps> = ({ children, isFetcher, className, ...props }) => {
  const fetcher = useFetcher();
  return isFetcher ? (
    <fetcher.Form className={clsx(styles.form, className)} action={props.action} method={props.method}>
      {children}
    </fetcher.Form>
  ) : (
    <Form action={props.action} className={clsx(styles.form, className)} method={props.method}>
      {children}

    </Form>
  );
};

export default FormM;
