import React from "react";
import { camelCaseToSpaceSeparated } from "../tools/string_manipulators";
import { HiRefresh } from "react-icons/hi";
const ProjectHeaderInfo = ({ projectInfo, setProjectInfo }) => {
  const handleHTMLTag = (key) => {
    if (key === "projectName") {
      return (
        <input
          type="text"
          className="single_header_input"
          placeholder={
            projectInfo[key] === true
              ? "Yes"
              : projectInfo[key] === false
              ? "No"
              : projectInfo[key]
          }
        ></input>
      );
    } else if (["createdAt", "status"].includes(key)) {
      return (
        <input
          type="text"
          disabled
          className="single_header_input"
          placeholder={projectInfo[key]}
        ></input>
      );
    } else {
      return (
        <div className="single_header_input special_header_input">
          <div className="label_toggle">
            {projectInfo[key] === true
              ? "Yes"
              : projectInfo[key] === false
              ? "No"
              : projectInfo[key]}
          </div>
          <div className="toggle_header" id={key} onClick={handleTextToggle}>
            <HiRefresh className="unclickable" />
          </div>
        </div>
      );
    }
  };
  const handleTextToggle = (e) => {
    // setProjectInfo({
    //     ...projectInfo
    // })
    if (e.target.id === "protect") {
      let toggled_value = projectInfo["protect"] === "Yes" ? "No" : "Yes";
      setProjectInfo({
        ...projectInfo,
        ["protect"]: toggled_value,
      });
    }
    if (e.target.id === "storageType") {
      let toggled_value =
        projectInfo["storageType"] === "Cloud" ? "Local" : "Cloud";
      setProjectInfo({
        ...projectInfo,
        ["storageType"]: toggled_value,
      });
    }
  };
  return (
    <div className="header_info">
      {["projectName", "storageType", "createdAt", "protect", "status"].map(
        (key) => {
          return (
            <div className="single_header_info">
              {handleHTMLTag(key)}
              <div className="single_header_input_info">
                {camelCaseToSpaceSeparated(key)}
              </div>
            </div>
          );
        }
      )}
      <div className="single_header_info">
        <input
          type="text"
          disabled
          className="single_header_input"
          placeholder="0"
        ></input>
        <div className="single_header_input_info">Images Number</div>
      </div>
    </div>
  );
};

export default ProjectHeaderInfo;
