import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

function AdminLogIn() {
  const navigate = useNavigate();

  //setting the states for the admins email and password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      //after the admin logs in we redirect him/her to the admin home page
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="home_container">
      <div className="home">
        <h3> Login </h3>
        <input
          id="logInEmail"
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <br />
        <input
          id="logInPassword"
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br />
        <button className="btn" onClick={login}>
          Login
        </button>
        <br />
        <Link to="/" className="btn">
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}

export default AdminLogIn;
