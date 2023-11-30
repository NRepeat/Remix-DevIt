import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import styles from "./styles.module.css";

function SortTypesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const HandleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hasSearch =
      search !== null && location.pathname === "/products/search";
    const hasPage = page !== null;

    const formData: Record<string, any> = {
      sort: e.target.value,
    };

    if (hasSearch) {
      formData.search = search;
    }

    if (hasPage) {
      formData.page = page;
    }

    submit(formData);
  };

  const submit = useSubmit();
  const sortLabel = [
    "Newest Arrivals",
    "By rating",
    "Price:Low to High",
    "Price:High to Low",
  ];
  const sortField = ["novelty", "rating",  "cheap","expensive"];
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
