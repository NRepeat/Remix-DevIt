import { Form, useSubmit } from "@remix-run/react";
const Sort = () => {
  const submit = useSubmit();
  const sortType = ["Price up", "Price down"];

  return (
    <div>
      <Form action={`/`} role="sort">
        <select
          id="s"
          name="s"
          onChange={(event) => submit({ s: event.target.value })}
        >
          {sortType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Form>
    </div>
  );
};

export default Sort;
