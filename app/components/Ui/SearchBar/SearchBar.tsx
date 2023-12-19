import { useNavigation, useSubmit } from "@remix-run/react";
import type { FC } from "react";
import { useEffect } from "react";
import FormM from "~/components/Ui/Form/FormM";
import { Input } from "~/components/Ui/Input/Input";
import styles from "./styles.module.css";

export interface SearchBarProps {
  action: string;
}

export const SearchBar: FC<SearchBarProps> = ({ action }) => {
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
    <FormM
      isFetcher={false}
      onChange={(event) => submit(event.currentTarget)}
      className={styles.search}
      action={action}
      role="search"
    >
      <Input
        id="search"
        aria-label="Search products"
        defaultValue={searchValue || ""}
        name="search"
        placeholder="Search"
        type="search"
      />
    </FormM>
  );
};
