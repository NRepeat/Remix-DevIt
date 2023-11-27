import {
  Form,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";



function SortTypesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const submit = useSubmit();
  const sortType = ["asc", "desc"];
  return (
    <Form>
      <select
        id="sort"
        name={"sort"}
        onChange={(e) => {
          submit({
            page: page !==null ? search : "",
            sort: e.target.value,

          },);
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
