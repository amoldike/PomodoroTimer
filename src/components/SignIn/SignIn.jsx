import React from "react";
import "./signin.css";
import { SignInWithGoogle } from "../Firebase";

const SignIn = () => {
  return (
    <div className="container">
      <button onClick={SignInWithGoogle} className="signin-btn">
        Sign In With Google
      </button>
    </div>
  );
};

export default SignIn;
