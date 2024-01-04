import { Outlet } from "@remix-run/react";
import { SingleProductLayout } from "~/Layout/StoreSingleProductLayout/SingleProductLayout";

export function ProductRoute() {
  return (
    <SingleProductLayout>
      <Outlet />
    </SingleProductLayout>
  );
}

export default ProductRoute;
