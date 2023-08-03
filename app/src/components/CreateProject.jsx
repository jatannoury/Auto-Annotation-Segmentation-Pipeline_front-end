import SignUpHeader from "../components/SignUpHeader";
import SignUpInput from "../components/SignUpInput";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { create_project, reset } from "../redux/slicers/projects/projectSlice";
import Spinner from "../components/Spinner";
import "../styles/signUp.css";

const CreateProject = ({
  toggleCreateBtn,
  createProjectRequest,
  setCreateProjectRequest,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    if (createProjectRequest === true) {
      setCreateProjectRequest(false);
      dispatch(create_project(formData));
    }
  }, [createProjectRequest]);
  useEffect(() => {
    if (isError) {
      console.log(message);
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

      dispatch(reset());
    } else if (isLoading) {
    }
  }, [isError, isSuccess]);
  const [formData, setFormData] = useState({
    projectName: "",
    totalNumber: 0,
    password: "",
    userId: user.userId,
    protect: "",
  });
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ "margin-top": "5%" }}>
      <form className="form_inputs">
        <SignUpHeader placeholder={"Create New Project"} />
        <div className="row">
          <SignUpInput
            placeholder={"Project Name"}
            setFormData={setFormData}
            formData={formData}
          />
          <SignUpInput
            placeholder={"Total Number"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>
        <div className="row">
          <SignUpInput
            placeholder={"Password"}
            setFormData={setFormData}
            formData={formData}
          />
          <SignUpInput
            placeholder={"Protect"}
            setFormData={setFormData}
            formData={formData}
          />
        </div>

        <div className="submit_row">
          <div className="input_component submit sign_up">
            <input
              type="submit"
              className="submit"
              onClick={toggleCreateBtn}
            ></input>
          </div>
          <div className="input_component submit sign_up">
            <input
              type="submit"
              className="close"
              value={"Close"}
              onClick={toggleCreateBtn}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
