import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { ChangeEvent } from "react";

interface SubmitTarget {
  // Замените тип any на нужный вам тип
  sort: string;
  search?: string | null;
}

function SortTypesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const submit = useSubmit();
  const sortType = ["asc", "desc"];
  return (
    <Form>
      <select
        id="sort"
        name={"sort"}
        onChange={(e) => {
          submit({
            sort: e.target.value,
            search: search !== null ? search : "",
          });
        }}
      >
        {sortType.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>
    </Form>
  );
}

export default SortTypesList;
