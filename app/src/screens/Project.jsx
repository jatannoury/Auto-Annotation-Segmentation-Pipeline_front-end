import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiInfoLarge } from "react-icons/ti";

import "../styles/project.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import { useSelector, useDispatch } from "react-redux";
import { start_project, reset } from "../redux/slicers/projects/projectSlice";
import { toast } from "react-toastify";
import handleRequestInfo from "../tools/handlers/project_screen_handlers";
import PendingProject from "../components/PendingProject";
import InProgressProject from "../components/InProgressProject";
import ProjectResults from "../components/ProjectResults";
import Spinner from "../components/Spinner";

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
  const [viewResults, setViewResults] = useState(false);
  const [projectSatus, setProjectStatus] = useState("Pending");
  const [indexNumber, setIndexNumber] = useState(5);
  const [aggregatedInputData, setAggregatedInputData] = useState(null);
  const [aggregatedOutputData, setAggregatedOutputData] = useState(null);
  const [isValidS3Path, setIsValidS3Path] = useState(true);
  const [useSpinner, setUseSpinner] = useState(false);
  const location = useLocation();

  useEffect(() => {
    projects.data.forEach((element) => {
      if (element.project_id === params.project_id) {
        setProjectInfo(element);
        setProjectStatus(element["status"]);
      }
    });
  }, []);
  useEffect(() => {
    if (request_name !== "start_project") {
      return;
    }
    if (isError) {
      setUseSpinner(false);

      toast.error("Request not successfull", {
        autoClose: 2000,
      });
      dispatch(reset());
    } else if (isSuccess) {
      setUseSpinner(false);

      setProjectInfo({ ...projectInfo, ["status"]: "Running" });
      setProjectStatus("Running");
      toast.success("Success", {
        autoClose: 2000,
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, request_name]);
  const handleViewResults = (e) => {
    if (!e.target.className.includes("view_prediction_btn")) {
      return;
    }
    if (projectSatus !== "Done") {
      return;
    }
    setViewResults(true);
  };
  const handleRunProject = () => {
    if (selectedDir === null) {
      toast.error("Please Input Directory", {
        autoClose: 2000,
      });
      return;
    }
    if (isValidS3Path === false) {
      alert("Invalid S3 Path. Please Check Info Icon");
      return;
    }
    setUseSpinner(true);
    dispatch(start_project(handleRequestInfo(selectedDir, projectInfo, user)));
  };

  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const totalContentHeight = e.target.scrollHeight;
    const windowHeight = e.target.clientHeight;
    const distanceToBottom =
      totalContentHeight - (scrollPosition + windowHeight);
    if (e.target.querySelector(".import_dir_info") !== null) {
    }
    if (viewResults === false) {
      return;
    }

    if (
      indexNumber <= aggregatedInputData.length &&
      scrollPosition + windowHeight > 0.8 * totalContentHeight
    ) {
      setIndexNumber(indexNumber + 5);
    }
  };
  return (
    <div className="project_root_container" onScroll={handleScroll}>
      <div className="project_main_container">
        {burgerMenuClicked === true ? (
          <HomeLeftContainer
            burger_menu_handler={burger_menu_handler}
            burgerMenuClicked={burgerMenuClicked}
          />
        ) : (
          <></>
        )}
        <div className="project_right_main_container" onScroll={handleScroll}>
          <div className="project_right_container">
            {useSpinner === true ? (
              <Spinner />
            ) : burgerMenuClicked === false ? (
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
            {projectSatus === "Pending" ? (
              <PendingProject
                setIsValidS3Path={setIsValidS3Path}
                isValidS3Path={isValidS3Path}
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
            ) : projectSatus !== "Pending" && viewResults === false ? (
              <InProgressProject
                projectInfo={projectInfo}
                setProjectInfo={setProjectInfo}
                handleViewResults={handleViewResults}
              />
            ) : (
              <ProjectResults
                setViewResults={setViewResults}
                projectInfo={projectInfo}
                indexNumber={indexNumber}
                aggregatedInputData={aggregatedInputData}
                setAggregatedInputData={setAggregatedInputData}
                aggregatedOutputData={aggregatedOutputData}
                setAggregatedOutputData={setAggregatedOutputData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
