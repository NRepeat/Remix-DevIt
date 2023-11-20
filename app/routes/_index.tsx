import { LoaderFunction, json } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import ContactsList from "~/components/ContactsList/ContactsList";
import { ContactRecord, getContacts } from "~/data";

export const loader: LoaderFunction = async () => {
  const contacts: ContactRecord[] = await getContacts();

  return contacts;
};

function Home() {
  const contacts: ContactRecord[] = useLoaderData<typeof loader>();
  return (
    <div>
      <ContactsList contacts={contacts} />
    </div>
  );
}

export default Home;
