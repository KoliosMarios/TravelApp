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

  //reference the input from comments form to be able to empty it
  const comment_input = document.getElementById("comment");

  //get the comments that are already in the database to display them
  useEffect(() => {
    const getComments = async () => {
      const colRef = collection(db, "comments");
      //We put in order order the documents from older to newest
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  }, []);

  const sendComment = async () => {
    //add the new comment in database
    await addDoc(usersCollectionRef, {
      name: newUserName,
      comment: newComment,
      time: newTime,
    });
    //empty the value in comment section after the user posts the comment
    // we don't change the name value because from the same device, chances are it is the same user
    //if a different user uses the app from the same device without it being refreshed he/she can change the name 
    comment_input.value = "";
    //Update the array of comments to display it again
    const getNewComments = async () => {
      const colRef = collection(db, "comments");
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNewComments();
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
            //we put the setNewTime function here again because we don't know which section the user is gonna complete first
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
