import { FC } from "react";
import { ContactMutation } from "~/data";
import ContactListItem from "../ContactListItem/ContactListItem";
import styles from "./styles.module.css";

const ContactsList: FC<{ contacts: ContactMutation[] }> = ({ contacts }) => {
  return (
    <div className={styles.wrapper}>
      <nav>
        {contacts.length ? (
          <ul className={styles.ul}>
            {contacts.map((contact: ContactMutation) => (
              <li key={contact.id}>
                <ContactListItem contact={contact} />
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  );
};

export default ContactsList;
