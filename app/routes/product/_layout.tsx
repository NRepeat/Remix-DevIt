import { Outlet } from "@remix-run/react";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";

function ProductRoute() {
  return (
    <SingleProductLayout>
      <Outlet />
    </SingleProductLayout>
  );
}

export default ProductRoute;
