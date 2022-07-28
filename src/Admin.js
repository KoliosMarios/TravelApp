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

  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);


  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const getMessages = async () => {
      const colRef = collection(db, "messages");
      const data = await getDocs(colRef);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getComments = async () => {
      const colRef = collection(db, "comments");
      const q = query(colRef, orderBy("time"));
      const data = await getDocs(q);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getMessages();
    getComments();
  }, []);

  const deleteMessage = async (id) => {
    const msg = doc(db, "messages", id);
    await deleteDoc(msg);
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
    getNewComments();
    getNewMessages();
  };

  const deleteComment = async (id) => {
    const comment = doc(db, "comments", id);
    await deleteDoc(comment);
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
    getNewComments();
    getNewMessages();
  };

  return (
    <div>
      <button onClick={logout}> Sign Out </button>
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
              >
                Delete Comment
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
