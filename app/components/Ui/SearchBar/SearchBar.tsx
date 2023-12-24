import { Form, useNavigation, useSubmit } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import React, { useEffect } from "react";
import { Input } from "~/components/Ui/Input/Input";
import styles from "./styles.module.css";

export interface SearchBarProps {
  children?: React.ReactNode;
  action: string;
  className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  children,
  action,
  className,
}) => {
  const nav = useNavigation();
  const submit = useSubmit();
  const urlParams = new URLSearchParams(nav.location?.search);
  const searchValue = urlParams.get("search");
  useEffect(() => {
    const searchField = document.getElementById("search");

    if (searchField instanceof HTMLInputElement && searchValue !== null) {
      searchField.value = searchValue || "";
    }
  }, [searchValue]);

  return (
    <Form
      onChange={(event) => submit(event.currentTarget)}
      className={clsx(styles.search, className)}
      action={action}
      role="search"
    >
      {children}

      <Input
        id="search"
        aria-label="Search products"
        defaultValue={searchValue || ""}
        name="search"
        placeholder="Search"
        type="search"
        className={className}
      />
    </Form>
  );
};
