import { Link } from "@remix-run/react";
import { FC } from "react";
import { ContactMutation } from "~/data";
import styles from "./styles.module.css";

const ContactListItem: FC<{ contact: ContactMutation }> = ({ contact }) => {
  return (
    <>
      <Link className={styles.link} to={`contact/${contact.id}`}>
        {contact.first || contact.last ? (
          <div className={styles.card}>
            <div className={styles.wrapper}>
              <div className={styles.avatar}>
                <img src={contact.avatar} alt="Contact avatar" />
              </div>
              <h2>
                {contact.first} {contact.last}
              </h2>
            </div>
          </div>
        ) : (
          <i>No Name</i>
        )}
      </Link>
    </>
  );
};

export default ContactListItem;
