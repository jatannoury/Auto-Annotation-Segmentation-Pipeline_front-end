import "../styles/signUp.css"
import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
  });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axiosInstance.register(formData).then((res) => {
  //     if (res === 201) {
  //       toast.success("User Registered");
  //       setTimeout(() => {
  //         navigate("/signIn");
  //       }, 1000);
  //     } else {
  //       console.log("TOAST");
  //       toast.error("Invalid Inputs");
  //     }
  //   });
  // };
  return (
    <div className="signup_container">
      <form className="form_inputs">
        <SignUpHeader />  
        <div className="row">
          <SignUpInput
            placeholder={"First Name"}
            setFormData={setFormData}
            formData={formData}
          />
          <SignUpInput
            placeholder={"Last Name"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp