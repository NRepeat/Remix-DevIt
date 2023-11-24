import { useSubmit, Form } from "@remix-run/react";
import { useFetcher } from "react-router-dom";

function SortTypesList() {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const sortType = ["asc", "desc"];
  return (
    <div>
      <Form role="sort" onChange={(e)=> console.log(e.currentTarget)}>
        <select id="sort" name="sort">
          {sortType.map((type) => (
            <>
              <input name="sort" type="hidden" value={type} />
              <option key={type} value={type}>
                {type}
              </option>
            </>
          ))}
        </select>
      </Form>
    </div>
  );
}

export default SortTypesList;
