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
}) => {
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
  const handleS3Path = (e) => {
    setS3Path(e.target.value);
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
                  <div className="s3_route_placeholder_container">
                    <p>Cloud Storage Route</p>
                    <BsFillCloudyFill />:
                    <div className="s3_route_input_holder">
                      <input
                        type="text"
                        className="s3_route_placeholder"
                        value={s3Path}
                        onChange={handleS3Path}
                        placeholder=""
                      />
                    </div>
                    <BsFillInfoCircleFill />
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
