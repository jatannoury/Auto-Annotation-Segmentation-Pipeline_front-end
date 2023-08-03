import "../styles/signUp.css";
import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../redux/slicers/auth/authSlice";

import Spinner from "../components/Spinner";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      message.map((err)=>{
        toast.error(`${err.loc[1]} ${err.msg}`, {
          autoClose: 2000,
        });
      })
      
      dispatch(reset())
    } else if (isSuccess) {
      toast.success("User Regsitered", {
        autoClose: 1000,
      });
      dispatch(reset())
      navigate("/");

    } else if (isLoading) {
    }
  }, [isError, isSuccess]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    password: "",
  });
  const redirect = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="signup_container">
      <form className="form_inputs" onSubmit={handleSubmit}>
        <SignUpHeader placeholder={"Sign Up"} />
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
          <p className="redirect" onClick={redirect}>
            Already a user? Login
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
