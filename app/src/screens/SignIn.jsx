import "../styles/signUp.css";
import "../styles/signIn.css";
import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";
import backend_cnx from "../tools/backend_connection";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slicers/auth/authSlice";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../redux/slicers/auth/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const redirect = () => {
    navigate("/Register");
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 1000,
      });
      dispatch(reset());
    } else if (isSuccess) {
      toast.success("Logged In", {
        autoClose: 1000,
      });
      dispatch(reset());
      navigate("/Home");
    } else if (isLoading) {
    }
  }, [isError, isSuccess]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
    // const response = await backend_cnx.sign_in(formData);
    // if (response?.status === 200) {
    //   toast.success("Logged In", {
    //     autoClose: 1000,
    //   });
    //   setTimeout(() => {
    //     navigate("/Home");
    //   }, 1000);
    // } else {
    //   toast.error("Wrong Credentials", {
    //     autoClose: 1000,
    //   });
    // }
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
          <p className="redirect" onClick={redirect}>
            Not a user? Sign up
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
