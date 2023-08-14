import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillFileAdd } from "react-icons/ai";
import { TbFolderQuestion } from "react-icons/tb";
import Project from "./Project";
import Modal from "../screens/Modal";
import CreateProject from "./CreateProject";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_project,
  reset,
  empty_request_name,
} from "../redux/slicers/projects/projectSlice";

import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
const HomeRightContainer = ({ burger_menu_handler, burgerMenuClicked }) => {
  const [createProjectClicked, setCreateProjectClicked] = useState(false);
  const [createProjectRequest, setCreateProjectRequest] = useState(false);
  const { projects, isLoading, isError, isSuccess, message, request_name } =
    useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleCreateBtn = (e) => {
    e.preventDefault();
    if (createProjectClicked === true && e.target.className === "submit") {
      setCreateProjectRequest(true);
    }
    setCreateProjectClicked(!createProjectClicked);
  };
  useEffect(() => {
    if (request_name != "delete_project") {
      return;
    }
    if (isError) {
      message.map((err) => {
        toast.error(`${err.loc[1]} ${err.msg}`, {
          autoClose: 2000,
        });
        dispatch(reset());
      });
    } else if (isSuccess && message !== null) {
      toast.success("Project Deleted", {
        autoClose: 1000,
      });
      dispatch(reset());
    } else if (isLoading) {
    }
    // dispatch(empty_request_name());
    dispatch(reset());
  }, [isError, isSuccess, message]);

  return (
    <div className="right_container_root">
      <Modal show={createProjectClicked} handleClose={toggleCreateBtn}>
        <CreateProject
          toggleCreateBtn={toggleCreateBtn}
          createProjectRequest={createProjectRequest}
          setCreateProjectRequest={setCreateProjectRequest}
        />
      </Modal>
      <div>
        {burgerMenuClicked === false ? (
          <RxHamburgerMenu
            size={30}
            onClick={burger_menu_handler}
            className="burger_menu_right_container"
          />
        ) : (
          <div className="burger_menu_placeholder"></div>
        )}
      </div>
      <div className="right_container_main">
        <div className="right_container_content">
          <div className="right_container_header">Projects</div>
          <div className="create_project">
            <div className="create_project_btn" onClick={toggleCreateBtn}>
              <AiFillFileAdd />

              <p>Create Project</p>
            </div>
          </div>
          <div className="projects">
            {projects !== null &&
            projects.hasOwnProperty("data") &&
            projects.items_count !== 0 ? (
              projects.data
                .slice() // Create a copy of the array to avoid mutating the original data
                .sort(
                  (a, b) => new Date(b["createdAt"]) - new Date(a["createdAt"])
                ) // Sort by createdAt
                .map((project, index) => {
                  console.log(index);
                  if (index >= 5) {
                    return <></>;
                  }
                  return (
                    <Project
                      key={project.project_id}
                      project_name={project["projectName"]}
                      created_at={project["createdAt"]}
                      remaining={
                        project.hasOwnProperty("remaining")
                          ? project["remaining"]
                          : project["totalNumber"]
                      }
                      total={project["totalNumber"]}
                      status={project["status"]}
                      project_id={project["project_id"]}
                      storage={project["storageType"]}
                    />
                  );
                })
            ) : (
              <div className="no_project">
                <TbFolderQuestion size={120} />
                <div>No Projects</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRightContainer;
