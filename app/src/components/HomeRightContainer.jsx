import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillFileAdd } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { TbFolderQuestion } from "react-icons/tb";
import Project from "./Project";
import Modal from "../screens/Modal";
import CreateProject from "./CreateProject";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_project,
  reset,
  empty_request_name,
  authenticate_project,
} from "../redux/slicers/projects/projectSlice";

import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import EnhancedTable from "./Table";
import AuthProject from "./AuthProject";
import { useNavigate } from "react-router-dom";

const HomeRightContainer = ({ burger_menu_handler, burgerMenuClicked }) => {
  const navigate = useNavigate();

  const [createProjectClicked, setCreateProjectClicked] = useState(false);
  const [createProjectRequest, setCreateProjectRequest] = useState(false);
  const [projectClicked, setProjectClicked] = useState(false);
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const [paginationIndex, setPaginationIndex] = useState(5);
  const [isclickedProjectProtected, setIsclickedProjectProtected] =
    useState(null);
  const [formData, setFormData] = useState({
    password: "",
  });
  const { projects, isLoading, isError, isSuccess, message, request_name } =
    useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const submitAuth = () => {
    // e.preventDefault();
    console.log("TESTING");
    dispatch(
      authenticate_project({
        project_id: clickedProjectId,
        password: formData["password"],
      })
    );
  };
  const handleNavigate = (e, project_id, isProtected) => {
    console.log(e.target);
    setProjectClicked(true);
    setClickedProjectId(project_id);
    if (e.target instanceof SVGElement) {
    } else {
      if (isProtected === true) {
        console.log(project_id);
      } else {
        navigate(`/Project/${project_id}`);
      }
    }
  };
  const handle_pagination = (e) => {
    if (
      e.target.className.baseVal === "pagination_icon_left" &&
      paginationIndex === 5
    ) {
      console.log(paginationIndex);
      return;
    } else if (
      e.target.className.baseVal === "pagination_icon_right" &&
      paginationIndex >= projects.data.length
    ) {
      console.log(paginationIndex);
      return;
    } else if (e.target.className.baseVal === "pagination_icon_left") {
      setPaginationIndex(paginationIndex - 5);
      console.log(paginationIndex - 5);
    } else if (e.target.className.baseVal === "pagination_icon_right") {
      setPaginationIndex(paginationIndex + 5);
      console.log(paginationIndex + 5);
    }
  };
  const toggleCreateBtn = (e) => {
    e.preventDefault();
    if (createProjectClicked === true && e.target.className === "submit") {
      setCreateProjectRequest(true);
    }
    setCreateProjectClicked(!createProjectClicked);
  };
  useEffect(() => {
    console.log(isError, isSuccess);
    if (request_name !== "authenticate_project") {
      return;
    }
    if (isError === true) {
      toast.error("Wrong Credentials", {
        autoClose: 1000,
      });
    } else if (isSuccess === true) {
      toast.success("Success", {
        autoClose: 1000,
      });
      navigate(`/Project/${clickedProjectId}`);
    }

    dispatch(reset());
  }, [isError, isSuccess]);
  const toggleProjectClicked = () => {
    setProjectClicked(!projectClicked);
    console.log(projectClicked);
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
      <Modal
        show={projectClicked}
        handleClose={toggleProjectClicked}
        extra_classname={"model-authenticate"}
      >
        <AuthProject
          toggleProjectClicked={toggleProjectClicked}
          setFormData={setFormData}
          formData={formData}
          submitAuth={submitAuth}
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
            {/* <EnhancedTable/> */}
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
                  if (index > paginationIndex || index <= paginationIndex - 5) {
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
                      isProtected={project["protect"]}
                      setProjectClicked={setProjectClicked}
                      setClickedProjectId={setClickedProjectId}
                      handleNavigate={handleNavigate}
                      setIsclickedProjectProtected={
                        setIsclickedProjectProtected
                      }
                    />
                  );
                })
            ) : (
              <div className="no_project">
                <TbFolderQuestion size={120} />
                <div>No Projects</div>
              </div>
            )}
            <div className="project_container pagination_main_container">
              <div className="pagination_container">
                {paginationIndex > 5 && (
                  <BiSkipPrevious
                    size={35}
                    className="pagination_icon_left"
                    onClick={handle_pagination}
                  />
                )}
                {paginationIndex >= projects.data.length === false && (
                  <BiSkipNext
                    size={35}
                    className="pagination_icon_right"
                    onClick={handle_pagination}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRightContainer;
