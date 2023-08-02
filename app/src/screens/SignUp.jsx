import "../styles/signUp.css";
import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("User Registered", {
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    // axiosInstance.register(formData).then((res) => {
    //   if (res === 201) {
    // toast.success("User Registered");
    // setTimeout(() => {
    //   navigate("/signIn");
    // }, 1000);
    //   } else {
    //     console.log("TOAST");
    //     toast.error("Invalid Inputs");
    //   }
    // });
  };
  return (
    <div className="signup_container">
      <form className="form_inputs" onSubmit={handleSubmit}>
        <SignUpHeader placeholder={"Sign Up"}/>
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
        <div className="row">
          <SignUpInput
            placeholder={"Birthday"}
            setFormData={setFormData}
            formData={formData}
          />
          <SignUpInput
            placeholder={"Gender"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="row">
          <SignUpInput
            placeholder={"Email"}
            setFormData={setFormData}
            formData={formData}
          />
          <SignUpInput
            placeholder={"Password"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="input_component submit sign_up">
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
