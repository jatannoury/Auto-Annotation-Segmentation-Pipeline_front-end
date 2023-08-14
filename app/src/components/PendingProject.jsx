import React, { useEffect, useRef, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BsFillCloudyFill, BsFillInfoCircleFill } from "react-icons/bs";
import { LuFileQuestion } from "react-icons/lu";
import ProjectHeaderInfo from "../components/ProjectHeaderInfo";
import ProjectSelectedDirTreeBuilder from "../components/ProjectSelectedDirTreeBuilder";
import { findOldestAndNewestTimestamps } from "../tools/datetime_helpers";
import { buildTree } from "../tools/file_helpers";

const PendingProject = ({
  s3Path,
  setSelectedDirTree,
  setSelectedDir,
  selectedDir,
  setS3Path,
  projectInfo,
  setProjectInfo,
  handleRunProject,
  selectedDirTree,
  isValidS3Path,
  setIsValidS3Path,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
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
  const handleInfoShow = () => {
    setIsHovered(!isHovered);
  };
  const handleS3Path = (e) => {
    setS3Path(e.target.value);
    // regex that only allows 3 delimiters : / and - and _ AND no 2 consecutive delimiters AND string can be empty AND cannot start with any delimiter
    const isValid = /^(?![-_/])[\w\/-]*(?:\/[\w-]+)*$/.test(e.target.value);
    setIsValidS3Path(isValid);
  };
  function getTotalFileSize(fileList) {
    let totalSize = 0;
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      totalSize += file.size;
    }

    return (totalSize / (1024 * 1024)).toFixed(5);
  }
  const fileInputRef = useRef(null);

  return (
    <div className="project_info_container">
      <div className="project_info">
        {projectInfo && (
          <>
            <ProjectHeaderInfo
              projectInfo={projectInfo}
              setProjectInfo={setProjectInfo}
              nb_of_files={selectedDir ? selectedDir["nb_of_files"] : 0}
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
                <div className="right_right_container">
                  <div
                    className={`s3_route_placeholder_container ${
                      isValidS3Path === false ? "wrong_s3_input" : ""
                    }`}
                  >
                    <p>Cloud Storage Route</p>
                    <BsFillCloudyFill />:
                    <div className="s3_route_input_holder">
                      <input
                        type="text"
                        className={`s3_route_placeholder ${
                          isValidS3Path === false ? "wrong_s3_input" : ""
                        }`}
                        value={s3Path}
                        onChange={handleS3Path}
                        placeholder=""
                      />
                    </div>
                    <div className="info_container">
                      <BsFillInfoCircleFill
                        className="icon"
                        onMouseEnter={handleInfoShow}
                        onMouseLeave={handleInfoShow}
                      />
                      <div
                        className={`info_text ${
                          isHovered === false && isValidS3Path === true
                            ? "display_none"
                            : ""
                        } ${
                          isValidS3Path === false ? "wrong_s3_input_info" : ""
                        } `}
                      >
                        <p className="convention_header">Convention:</p>
                        <p className="convention_number">
                          - Allowed delimiters: / - _
                        </p>
                        <p className="convention_number">
                          - Path can't start with delimiter
                        </p>
                        <p className="convention_number">
                          -No consecutive delimiter
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="start_process">
                    <div className="submit_btn" onClick={handleRunProject}>
                      Start Process
                    </div>
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
  );
};

export default PendingProject;
