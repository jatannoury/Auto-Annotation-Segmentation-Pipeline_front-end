import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiInfoLarge } from "react-icons/ti";
import { AiFillFileAdd } from "react-icons/ai";
import { BsFillCloudyFill } from "react-icons/bs";
import { LuFileQuestion } from "react-icons/lu";
import { RiFileAddLine } from "react-icons/ri";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { MdStorage } from "react-icons/md";
import { GoNumber } from "react-icons/go";
import "../styles/project.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import { useSelector } from "react-redux";
import ProjectHeaderInfo from "../components/ProjectHeaderInfo";
import { findOldestAndNewestTimestamps } from "../tools/datetime_helpers";
import { buildTree } from "../tools/file_helpers";
import ProjectSelectedDirTreeBuilder from "../components/ProjectSelectedDirTreeBuilder";
const Project = () => {
  const params = useParams();
  const { projects } = useSelector((state) => state.projects);
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const [projectInfo, setProjectInfo] = useState(false);
  const [selectedDir, setSelectedDir] = useState(null);
  const [selectedDirTree, setSelectedDirTree] = useState(null);

  function getTotalFileSize(fileList) {
    let totalSize = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      totalSize += file.size;
    }

    return (totalSize / (1024 * 1024)).toFixed(5);
  }

  useEffect(() => {
    projects.data.forEach((element) => {
      element.project_id === params.project_id && setProjectInfo(element);
    });
  }, []);
  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const fileInputRef = useRef(null);

  const handleDirChange = (event) => {
    const files = event.target.files;
    setSelectedDir({
      nb_of_files: event.target.files.length,
      ...findOldestAndNewestTimestamps(files),
      "total_size(MB)": getTotalFileSize(files),
      "total_size(GB)": (getTotalFileSize(files) / 1024).toFixed(5),
      data: files,
    });
    setSelectedDirTree(
      buildTree(
        Object.keys(files).map((element) => {
          return files[element];
        })
      )
    );
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
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
            <div className="project_info_container">
              <div className="project_info">
                {projectInfo && (
                  <>
                    <ProjectHeaderInfo
                      projectInfo={projectInfo}
                      setProjectInfo={setProjectInfo}
                    />
                    <div className="project_body_info">
                      <div className="extra_info_container">
                        <div className="add_dir">
                          <AiFillFileAdd size={27} onClick={handleIconClick} />
                          <input
                            ref={fileInputRef}
                            directory=""
                            webkitdirectory=""
                            type="file"
                            id="fileInput"
                            accept=".jpeg, .png, .jpg, .avif"
                            className="hidden_file_input"
                            onChange={handleDirChange}
                          />
                        </div>
                        <div className="s3_route_placeholder_container">
                          <p>Cloud Storage Route</p>
                          <BsFillCloudyFill />:
                          <div className="s3_route_input_holder">
                            <input
                              type="text"
                              className="s3_route_placeholder"
                              value={selectedDirectory}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="import_dir_info">
                        {selectedDir === null && selectedDirTree === null ? (
                          <LuFileQuestion size={120} />
                        ) : (
                          <div className="project_body_container">
                            <ProjectSelectedDirTreeBuilder
                              selectedDirTree={selectedDirTree}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
