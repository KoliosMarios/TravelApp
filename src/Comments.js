import "./styles/Home.css";
import { useState } from "react";
import { db } from "./firebase-config";
import { collection, addDoc } from "firebase/firestore";

function Comments() {
  const [newUserName, setNewUserName] = useState("user");
  const [newComment, setNewComment] = useState("");
  const usersCollectionRef = collection(db, "comments");

  const userName_input = document.getElementById("userName");
  const comment_input = document.getElementById("comment");

  const sendComment = async () => {
    await addDoc(usersCollectionRef, {
      name: newUserName,
      comment: newComment,
    });
    alert("Message send!");
    userName_input.value = "";
    comment_input.value = "";
  };

  return (
    <div className="comments">
      <div className="comment_form">
        <label htmlFor="username" className="label">
          Name:
        </label>
        <input
          type="string"
          id="userName"
          placeholder="(optional)"
          onChange={(event) => {
            setNewUserName(event.target.value);
          }}
        />
        <label htmlFor="msg" className="label">
          Message:
        </label>
        <br />
        <textarea
          type="string"
          placeholder="..."
          id="comment"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />
        <button onClick={sendComment} className="btn">
          Send message
        </button>
      </div>
      <div className="comments_list">List</div>
    </div>
  );
}
export default Comments;
