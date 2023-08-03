import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillFileAdd } from "react-icons/ai";
import Project from "./Project";
import Modal from "../screens/Modal";
import CreateProject from "./CreateProject";
import { useSelector, useDispatch } from "react-redux";
import { get_projects, reset } from "../redux/slicers/projects/projectSlice";

import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
const HomeRightContainer = ({ burger_menu_handler, burgerMenuClicked }) => {
  const [createProjectClicked, setCreateProjectClicked] = useState(false);
  const [createProjectRequest, setCreateProjectRequest] = useState(false);
  const { projects, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projects
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleCreateBtn = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (createProjectClicked === true && e.target.className === "submit") {
      setCreateProjectRequest(true);
    }
    setCreateProjectClicked(!createProjectClicked);
  };
  useEffect(() => {
    if (isError) {
      message.map((err) => {
        toast.error(`${err.loc[1]} ${err.msg}`, {
          autoClose: 2000,
        });
      });

      dispatch(reset());
    } else if (isSuccess) {
      dispatch(reset());
    } else if (isLoading) {
    }
  }, [isError, isSuccess]);

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
            {projects !== null && projects.hasOwnProperty("data") ? (
              projects.data.map((project) => {
                return (
                  <Project
                    project_name={project["projectName"]}
                    created_at={project["createdAt"]}
                    remaining={
                      project.hasOwnProperty("remaining")
                        ? project["remaining"]
                        : project["totalNumber"]
                    }
                    total={project["totalNumber"]}
                    status={project["status"]}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRightContainer;
