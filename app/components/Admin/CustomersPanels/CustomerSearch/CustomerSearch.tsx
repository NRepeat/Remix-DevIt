import { FC, useEffect } from "react";
import { Form, useNavigation, useSubmit } from "@remix-run/react";


export const CustomerSearch: FC = () => {
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
    <input
      onChange={(event) => submit({ search: event.target.value })}
      id="search"
      aria-label="Search customer"
      defaultValue={searchValue || ""}
      name="search"
      placeholder="Search"
      type="search"
    />
  );
};
