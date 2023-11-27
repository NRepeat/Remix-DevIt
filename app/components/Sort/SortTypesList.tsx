import { useSubmit } from "@remix-run/react";


function SortTypesList() {
  const submit = useSubmit();
  const sortType = ["asc", "desc"];
  
  return (
        <select id="sort" name="sort" onChange={(e) => submit({sort:e.target.value})}>
          {sortType.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
  );
}

export default SortTypesList;
