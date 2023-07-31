import "../styles/signUp.css"

import React from 'react'
import { FaUserAlt } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="signup_container">
      <form  className="form_inputs">
        <h1 className="sign_up">
          <FaUserAlt className="sing_up_icon" />
          <span className="sign_up_text">Sign Up</span>
        </h1>
      </form>
    </div>
  );
}

export default SignUp