import "./styles/Comments.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import moment from "moment";

function Comments() {
  //set states
  const [newUserName, setNewUserName] = useState("unknown user");
  const [newComment, setNewComment] = useState("unknown comment");
  const [comments, setComments] = useState([]);

  //reference to "comments" collection
  const colRef = collection(db, "comments");

  //reference the input from comments form to be able to empty it
  const comment_input = document.getElementById("comment");

  //get the comments that are already in the database to display them
  useEffect(() => {
    const getComments = async () => {
      //We put in order the documents from older to newest
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  }, []);

  const sendComment = async () => {
    //add the new comment in database
    await addDoc(colRef, {
      name: newUserName,
      comment: newComment,
      //Here we get timestamp from the point the comment is posted
      time: Timestamp.fromDate(new Date()),
    });
    //empty the value in comment section after the user posts the comment
    // we don't change the name value because from the same device, chances are it is the same user
    //if a different user uses the app from the same device without it being refreshed he/she can change the name
    comment_input.value = "";
    //Update the array of comments to display it again
    const getNewComments = async () => {
      //We put in order the documents from older to newest
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
          id="comment"
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />
        <br />
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
              {/* We use the fromNow() function to show us how much time has passed since the comment was posted */}
              <small>{moment(comment.time.toDate()).fromNow()}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Comments;
