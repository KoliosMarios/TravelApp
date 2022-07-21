import "./styles/Home.css";
import { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Contact() {
  //States for the inputs and message of the user
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMsg, setNewMsg] = useState("");
  //reference to the firebase collection that saves the messages
  const usersCollectionRef = collection(db, "messages");

  //reference the inputs and text area so we can empty them after we submit the message
  const name_input = document.getElementById("name");
  const email_input = document.getElementById("email");
  const msg_input = document.getElementById("msg");

  // function that "sends" the message. Actually it saves it to the firebase collection
  const sendMsg = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      email: newEmail,
      msg: newMsg,
    });
    //We inform the user that the message is sent and empty the inputs
    alert("Message send!");
    name_input.value = "";
    email_input.value = "";
    msg_input.value = "";
  };

  return (
    <div className="home_container">
      <div className="home">
        <h3 className="home_subtitle">Leave us your message!</h3>
        <label htmlFor="name" className="label">
          Name:
        </label>
        <br />
        <input
          type="string"
          id="name"
          placeholder="(optional)"
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
          id="email"
          placeholder="(optional)"
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
        <button onClick={sendMsg} className="btn">
          Send message
        </button>
      </div>
    </div>
  );
}

export default Contact;
