import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
const SignUpHeader = ({placeholder}) => {
  return (
    <div className="sign_up_header">
      <div className="sing_up_icon_container">
        {placeholder === "Sign Up" ? (
          <FaUserAlt size={25} />
        ) : (
          <FiLogIn size={25} />
        )}
      </div>
      <div className="sign_up_text_label">{placeholder}</div>
    </div>
  );
}

export default SignUpHeader