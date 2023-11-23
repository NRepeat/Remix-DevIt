import { FC, useEffect } from "react";
import styles from "./styles.module.css";
import { Form,  useNavigation, useSubmit } from "@remix-run/react";

export const SearchBar: FC = () => {
  const nav = useNavigation();
  const submit = useSubmit();
  useEffect(() => {
    const urlParams = new URLSearchParams(nav.location?.search);
    const qValue = urlParams?.get("q");
    const searchField = document.getElementById("q");
   
    if (searchField instanceof HTMLInputElement && qValue !== null) {
      searchField.value = qValue || "";
    }
  }, [nav]);


  return (
    <>
      <Form
        onChange={(event) => submit(event.currentTarget)}
        className={styles.search}
        action="/search"
        role="search"
      >
        <input
          id="q"
          aria-label="Search products"
          defaultValue={""}
          name="q"
          placeholder="Search"
          type="search"
        />
      </Form>
    </>
  );
};
