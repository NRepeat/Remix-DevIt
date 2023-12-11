import LoginPage from "~/pages/LoginPage/LoginPage";

import { redirect, type ActionFunctionArgs } from "@remix-run/node";
export async function action({ params, request }: ActionFunctionArgs) {
  const data = await request.formData();
  console.log("🚀 ~ file: _auth.login.tsx:6 ~ action ~ data :", data);

  return redirect("/login");
}

export default function () {
  return <LoginPage />;
}
