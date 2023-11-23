import {
  Form,
  useFetcher,
  useFetchers,
  useMatches,
  useRouteLoaderData,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";

const Filtr = ({ products }) => {
  const [categories, setCategories] = useState([]);
  const submit = useSubmit();

  useEffect(() => {
    setCategories(products.map((item) => item.category));
  },[]);

  // const categories = useMemo(() => {
  //   return products.map((item) => item.category);
  // }, [products]);
  const uniqueCategories = [...new Set(categories)];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    submit({ c: selectedValue }, { action: "search" });
  };

  return (
    <Form action="/search" method="get" role="search">
      <select id="c" name="c" value={selectedCategory} onChange={handleSubmit}>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            <input name="category" type="hidden" value={category} />
            {category}
          </option>
        ))}
      </select>
    </Form>
  );
};

export default Filtr;
