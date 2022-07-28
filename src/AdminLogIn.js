import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";

function AdminLogIn() {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const log_in_email = document.getElementById("logInEmail");
  const log_in_password = document.getElementById("logInPassword");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      log_in_email.value = "";
      log_in_password.value = "";
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
          {" "}
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
