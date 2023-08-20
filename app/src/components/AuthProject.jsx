import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  create_project,
  reset,
  empty_request_name,
  set_project,
} from "../redux/slicers/projects/projectSlice";
import Spinner from "../components/Spinner";
import "../styles/signUp.css";

const AuthProject = ({
  toggleProjectClicked,
  submitAuth,
  setFormData,
  formData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    request_name,
    isLoading,
    isError,
    isSuccess,
    message,
    project,
    projects,
  } = useSelector((state) => state.projects);
  const closeAuthProject = (e) => {
    e.preventDefault();
    toggleProjectClicked(false);
  };
  
  useEffect(() => {
    if (request_name !== "create_project" ) {
      return;
    }
    if (isError) {
      message.map((err) => {
        toast.error(err.msg, {
          autoClose: 1000,
        });
        dispatch(reset());
      });
    } else if (isSuccess) {
      toast.success("Project Created", {
        autoClose: 1000,
      });

      dispatch(empty_request_name());
      dispatch(reset());
    } else if (isLoading) {
    }
    dispatch(empty_request_name());
    dispatch(reset());
  }, [isError, isSuccess]);

  //   useEffect(() => {
  //     if (createProjectRequest === true) {
  //       setCreateProjectRequest(false);
  //       set_project(formData);

  //       dispatch(create_project(formData));
  //     }
  //   }, [createProjectRequest]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div style={{ "margin-top": "5%" }}>
      <SignUpHeader placeholder={"Please Enter Password"} no_icon={true} />
      <div className="row create_modal authenticate">
        <SignUpInput
          placeholder={"Password"}
          setFormData={setFormData}
          formData={formData}
        />
      </div>

      <div className="submit_row authenticate">
        <div className="input_component submit">
          <input type="submit" className="submit" onClick={submitAuth}></input>
        </div>
        <div className="input_component submit">
          <input
            type="submit"
            className="close"
            value={"Close"}
            onClick={closeAuthProject}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default AuthProject;
