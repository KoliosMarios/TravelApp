import "./styles/Home.css";
import { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Contact() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const usersCollectionRef = collection(db, "messages");

  const createMsg = async () => {
    await addDoc(usersCollectionRef, { name: newName, email: newEmail, msg: newMsg });
    alert("Message send!");
    window.location.reload();
  };

  return (
    <div className="home_container">
      <div className="home">
        <h3>Leave us your message!</h3>
        <label htmlFor="name" className="label">
          Name:
        </label>
        <br />
        <input
          type="string"
          placeholder="(Optional)"
          id="name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <br />
        <label htmlFor="email" className="label">
          Email:
        </label>
        <br />
        <input
          type="string"
          placeholder="(Optional)"
          id="email"
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
        />
        <br />
        <label htmlFor="msg" className="label">
          Message:
        </label>
        <br />
        <textarea
          type="string"
          placeholder="..."
          id="msg"
          onChange={(event) => {
            setNewMsg(event.target.value);
          }}
        />
        <br />
        <button onClick={createMsg} className="btn">
          Send message
        </button>
      </div>
    </div>
  );
}

export default Contact;
