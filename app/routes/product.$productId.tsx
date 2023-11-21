import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Product from "~/components/Product/Product";
import { getProduct } from "~/services/product.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.productId, "Missing contactId param");
  const product = await getProduct(params.productId);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ product });
};
export const meta:MetaFunction<typeof loader> = ({data})=>{
    if(!data){
        return [
         
          ] 
    }
    return [
      {
        title:data.product.title
      }
    ]
  }
function ProductPage() {
    const {product }= useLoaderData<typeof loader>()
  return <Product product={product} />;
}

export default ProductPage;
