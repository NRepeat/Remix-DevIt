import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";

function SortTypesList() {
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const HandleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hasSearch = search !== null;
    const hasPage = page !== null;
    const hasCategory = category !== null;
    const formData: Record<string, any> = {
      sort: e.target.value,
    };

    if (hasSearch) {
      formData.search = search;
    }

    if (hasPage) {
      formData.page = page;
    }
    if (hasCategory) {
      formData.category = category;
    }
    submit(formData);
  };

  const sortLabel = [
    "Newest Arrivals",
    "By rating",
    "Price:Low to High",
    "Price:High to Low",
  ];
  const sortField = ["novelty", "rating", "cheap", "expensive"];
  return (
    <Form>
      <select
        className={styles.sort}
        id="sort"
        name="sort"
        onChange={HandleSubmit}
      >
        {sortLabel.map((type, i) => (
          <option className={styles.option} key={i} value={sortField[i]}>
            {type}
          </option>
        ))}
      </select>
    </Form>
  );
}

export default SortTypesList;
