import "../styles/signUp.css";
import "../styles/signIn.css";
import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";
import backend_cnx from "../tools/backend_connection";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await backend_cnx.sign_in(formData);
    console.log(response);
    if (response?.status === 200) {
      toast.success("Logged In", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    } else {
      toast.error("Wrong Credentials", {
        autoClose: 1000,
      });
    }
  };
  return (
    <div className="signup_container">
      <form className="form_inputs" onSubmit={handleSubmit}>
        <SignUpHeader placeholder={"Sign In"} />

        <div className="row sign_in">
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
        <div className="input_component submit sign_in">
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
