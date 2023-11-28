import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { postProductsData } from "~/services/product.server";



export async function action({request,params}: ActionFunctionArgs) {

  const data = await postProductsData()
  console.log("🚀 ~ file: products.sinc.tsx:9 ~ action ~ data:", data)
return {}
}