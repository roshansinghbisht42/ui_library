import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onToggle }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("loggedInUserId", user.uid);
      setMessage("Login is successful!");

      // Delay slightly for user feedback before redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setMessage("Incorrect Email or Password");
      } else {
        setMessage("Account does not exist");
      }
    }
  };

  return (
    <div className="container" id="signIn">
      <h1 className="form-title">Sign In</h1>
      <form onSubmit={handleSignIn}>
        {message && <div className="messageDiv">{message}</div>}

        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <p className="recover">
          <a href="#">Recover Password</a>
        </p>

        <button type="submit" className="btn">Sign In</button>
      </form>

      <p className="or">----------or--------</p>

      <div className="icons">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook"></i>
      </div>

      <div className="links">
        <p>Don't have an account yet?</p>
        <button onClick={onToggle}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignIn;
