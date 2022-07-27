import { db } from "./firebase-config";
import { auth } from "./firebase-config";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);

  const navigateToHome = () => {
    navigate('/');
  };

  const logout = async () => {
    await signOut(auth);
    navigateToHome();
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

  return (
    <div>
      <button onClick={logout}> Sign Out </button>
      <div className="messages">
        {messages.map((message) => {
          return (
            <div className="message" key={message.id}>
              <h1>{message.name}</h1>
              <h3>{message.email}</h3>
              <p>{message.msg}</p>
            </div>
          );
        })}
      </div>
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <h1>{comment.name}</h1>
              <p>{comment.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
