import { FC } from "react";
import { ContactMutation } from "~/data";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
const Contact: FC<{ contact: ContactMutation }> = ({ contact }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {" "}
        <div className={styles.poster}>
          <img src={contact.avatar} alt="contact avatar" />
        </div>
        <div className={styles.information}>
          <h2>{`${contact.first}   ${contact.last}`}</h2>
          <p className={styles.twitter}>Twitter: {contact.twitter}</p>
          <Link to={'/'}>
            <button className={styles.bcontact} >CONTACT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
