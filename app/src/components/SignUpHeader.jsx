import React from 'react'
import { FaUserAlt } from "react-icons/fa";

const SignUpHeader = () => {
  return (
    <div className="sign_up_header">
      <div className="sing_up_icon_container">
        <FaUserAlt size={25} />
      </div>
      <div className="sign_up_text_label">Sign Up</div>
    </div>
  );
}

export default SignUpHeader