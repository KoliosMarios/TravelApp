import "./styles/Comments.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

function Comments() {
  //set states
  const [newUserName, setNewUserName] = useState("unknown user");
  const [newComment, setNewComment] = useState("");
  const [newTime, setNewTime] = useState(0);
  const [comments, setComments] = useState([]);

  //reference to "comments" collection
  const usersCollectionRef = collection(db, "comments");

  //getting the input from comments form
  const userName_input = document.getElementById("userName");
  const comment_input = document.getElementById("comment");

  useEffect(() => {
    const getComments = async () => {
      const colRef = collection(db, "comments");
      //We order the documents from older to newest
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  }, [comments]);

  const sendComment = async () => {
    await addDoc(usersCollectionRef, {
      name: newUserName,
      comment: newComment,
      time: newTime,
    });
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
            setNewTime(Date.now());
          }}
        /><br/>
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
            setNewTime(Date.now());
          }}
        /><br/>
        <button onClick={sendComment} className="btn">
          Send message
        </button>
      </div>
      <div className="comments_list">
        {comments.map((comment) => {
          return (
            <div className="comment_item" key={comment.id}>
              <h3>{comment.name}</h3>
              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Comments;
