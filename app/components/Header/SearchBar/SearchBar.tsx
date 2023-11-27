import { FC, useEffect } from "react";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";


export const SearchBar: FC = () => {
  const nav = useNavigation();
  const submit = useSubmit();
  const urlParams = new URLSearchParams(nav.location?.search);
  const searchValue = urlParams?.get("search");

  useEffect(() => {
    const searchField = document.getElementById("search");

    if (searchField instanceof HTMLInputElement && searchValue !== null) {
      searchField.value = searchValue || "";
    }
  }, [searchValue]);

  return (
    <Form
      onChange={(event) => submit(event.currentTarget)}
      className={styles.search}
      action="/products/search"
      role="search"
    >
      <input
        id="search"
        aria-label="Search products"
        defaultValue={searchValue || ""}
        name="search"
        placeholder="Search"
        type="search"
      />
    </Form>
  );
};
