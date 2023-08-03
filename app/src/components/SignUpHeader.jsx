import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
const SignUpHeader = ({ placeholder }) => {
  return (
    <div className="sign_up_header">
      <div className="sing_up_icon_container">
        {placeholder === "Sign Up" ? (
          <FaUserAlt size={25} />
        ) : placeholder === "Sign In" ? (
          <FiLogIn size={25} />
        ) : (
          <MdOutlineCreateNewFolder size={25} />
        )}
      </div>
      <div className="sign_up_text_label">{placeholder}</div>
    </div>
  );
};

export default SignUpHeader;
