import "./styles/Admin.css";
import { db } from "./firebase-config";
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  //set the states that help us display the messages and the comments
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);

  //create the logout function for the admin which redirects him/her to the home page again
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  //Get the comments and messages upon loading
  useEffect(() => {
    const getMessages = async () => {
      const colRef = collection(db, "messages");
      const data = await getDocs(colRef);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getComments = async () => {
      const colRef = collection(db, "comments");
      //We put in order order the documents from older to newest
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMessages();
    getComments();
  }, []);

  //These two functions change the states every time the admin deletes a comment
  const getNewMessages = async () => {
    const colRef = collection(db, "messages");
    const data = await getDocs(colRef);
    setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getNewComments = async () => {
    const colRef = collection(db, "comments");
    const q = query(colRef, orderBy("time"));
    const data = await getDocs(q);
    setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //Functions to delete message and comment respectively
  const deleteMessage = async (id) => {
    const msg = doc(db, "messages", id);
    await deleteDoc(msg);
    getNewComments();
    getNewMessages();
  };

  const deleteComment = async (id) => {
    const comment = doc(db, "comments", id);
    await deleteDoc(comment);
    getNewComments();
    getNewMessages();
  };

  return (
    <div>
      <div className="adminMessages">
        <h1>Messages</h1>
        {messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <h3>{message.name}</h3>
              <h3>{message.email}</h3>
              <p>{message.msg}</p>
              <button
                onClick={() => {
                  deleteMessage(message.id);
                }}
                className="deleteBtn"
              >
                Delete Message
              </button>
            </div>
          );
        })}
      </div>
      <div className="adminComments">
        <h1>Comments</h1>
        {comments.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <h3>{comment.name}</h3>
              <p>{comment.comment}</p>
              <button
                onClick={() => {
                  deleteComment(comment.id);
                }}
                className="deleteBtn"
              >
                Delete Comment
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={logout} className="signOutBtn">
        {" "}
        Sign Out{" "}
      </button>
    </div>
  );
}

export default Admin;
