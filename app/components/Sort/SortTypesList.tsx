import { Form, useSubmit } from "@remix-run/react";

function SortTypesList() {
  const submit = useSubmit();
  const sortLabel = [
    "By rating",
    "Price:Low to High",
    "Price:High to Low",
    "Newest Arrivals",
  ];
  const sortField = ["rating", "cheap", "expensive", "novelty"];
  return (
    <Form>
      <select
        id="sort"
        name="sort"
        onChange={(e) => {
          submit({
            sort: e.target.value,
          });
        }}
      >
        {sortLabel.map((type, i) => (
          <option key={i} value={sortField[i]}>
            {type}
          </option>
        ))}
      </select>
    </Form>
  );
}

export default SortTypesList;
