import { Form, useLocation, useSearchParams, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";

function SortTypesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const search = searchParams.get("search");
  const page = searchParams.get("page");
 

  const HandleSubmit = (e: any) => {
    if (search!) {
      submit({
        sort: e.target.value,
        search: search,
      });
    } else if (search === null && location.pathname === '/products/search') {
      submit({
        sort: e.target.value,
      });
    } else if (page!) {
      submit({
        sort: e.target.value,
        page:page,
      });
    } else if (search === null) {
      submit({
        sort: e.target.value,
      });
    }
  };

  const submit = useSubmit();
  const sortLabel = [
    "Newest Arrivals",
    "By rating",
    "Price:Low to High",
    "Price:High to Low",
  ];
  const sortField = ["rating", "cheap", "expensive", "novelty"];
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
