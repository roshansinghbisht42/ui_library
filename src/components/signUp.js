import React from "react";

const SignUp = ({ onToggle }) => {
  return (
    <div className="container" id="signup">
      <h1 className="form-title">Register</h1>
      <form>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input type="text" id="fName" placeholder="First Name" required />
          <label htmlFor="fName">First Name</label>
        </div>

        <div className="input-group">
          <i className="fas fa-user"></i>
          <input type="text" id="lName" placeholder="Last Name" required />
          <label htmlFor="lName">Last Name</label>
        </div>

        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input type="email" id="rEmail" placeholder="Email" required />
          <label htmlFor="rEmail">Email</label>
        </div>

        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input type="password" id="rPassword" placeholder="Password" required />
          <label htmlFor="rPassword">Password</label>
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>

      <p className="or">----------or--------</p>
      <div className="icons">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook"></i>
      </div>

      <div className="links">
        <p>Already have an account?</p>
        <button onClick={onToggle}>Sign In</button>
      </div>
    </div>
  );
};

export default SignUp;
