import { LoaderFunction, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FC } from "react";
import Contact from "~/components/Contact/Contact";
import { ContactMutation, getContact } from "~/data";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  if (params.contactId === undefined) {
    throw new Response("Contact ID is undefined", { status: 400 });
  }
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not found", { status: 404 });
  }
  return json({ contact });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {

  return [{
    title: data.contact.id
  }]
}

const ContactPage: FC = () => {
  const { contact }: { contact: ContactMutation } = useLoaderData<typeof loader>();
  return <Contact contact={contact} />;
};

export default ContactPage;
