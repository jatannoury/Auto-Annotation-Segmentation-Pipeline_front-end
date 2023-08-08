import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiInfoLarge } from "react-icons/ti";

import "../styles/project.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import { useSelector, useDispatch } from "react-redux";
import { start_project, reset } from "../redux/slicers/projects/projectSlice";
import { toast } from "react-toastify";
import handleRequestInfo from "../tools/handlers/project_screen_handlers";
import PendingProject from "../components/PendingProject";

const Project = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { projects } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const { request_name, isError, isSuccess, message, data } = useSelector(
    (state) => state.projects
  );

  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const [projectInfo, setProjectInfo] = useState(false);
  const [selectedDir, setSelectedDir] = useState(null);
  const [selectedDirTree, setSelectedDirTree] = useState(null);
  const [s3Path, setS3Path] = useState("");
  const [projectRequestInfo, setProjectRequestInfo] = useState(null);
  const [selectedDirectory, setSelectedDirectory] = useState("");

  const handleRunProject = () => {
    if (selectedDir === null) {
      toast.error("Please Select Directory", {
        autoClose: 2000,
      });
      return;
    }
    dispatch(start_project(handleRequestInfo(selectedDir, projectInfo, user)));
  };

  useEffect(() => {
    projects.data.forEach((element) => {
      element.project_id === params.project_id && setProjectInfo(element);
    });
  }, []);
  useEffect(() => {
    if (request_name !== "start_project") {
      return;
    }
    if (isError) {
      toast.error("Request not successfull", {
        autoClose: 2000,
      });
    } else if (isSuccess) {
      toast.success("Success", {
        autoClose: 2000,
      });
    }
    dispatch(reset());
  }, [isError, isSuccess]);
  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };

  return (
    <div className="project_root_container">
      <div className="project_main_container">
        {burgerMenuClicked === true ? (
          <HomeLeftContainer
            burger_menu_handler={burger_menu_handler}
            burgerMenuClicked={burgerMenuClicked}
          />
        ) : (
          <></>
        )}
        <div className="project_right_main_container">
          <div className="project_right_container">
            {burgerMenuClicked === false ? (
              <RxHamburgerMenu
                size={30}
                onClick={burger_menu_handler}
                className="burger_menu_right_container"
              />
            ) : (
              <div className="burger_menu_placeholder"></div>
            )}
            <div className="header">
              <div className="icon_holder">
                <TiInfoLarge />
              </div>
              <div>{projectInfo["projectName"]}</div>
            </div>
            {projectInfo["status"] === "Pending" ? (
              <PendingProject
                s3Path={s3Path}
                setSelectedDirTree={setSelectedDirTree}
                setSelectedDir={setSelectedDir}
                selectedDir={selectedDir}
                setS3Path={setS3Path}
                projectInfo={projectInfo}
                setProjectInfo={setProjectInfo}
                handleRunProject={handleRunProject}
                selectedDirTree={selectedDirTree}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
