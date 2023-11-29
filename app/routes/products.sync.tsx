import { json } from "@remix-run/node";
import { importDummyData} from "~/services/import.server";


export async function action() {
  // await importDummyData()
  return json({ success: true });
}
