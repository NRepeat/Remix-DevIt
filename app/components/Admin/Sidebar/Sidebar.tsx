import { Link } from "@remix-run/react";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"customers"}>Customers</Link>
        </li>
        <li>
          <Link to={"products"}> Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
