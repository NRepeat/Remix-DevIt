import { json, redirect } from "@remix-run/node";
import { importDummyData } from "~/services/import.server";

export async function action() {
  try {
    await importDummyData();
    return  redirect("/products/")
  } catch (error) {
    return json({ success: false, error });
  }
}