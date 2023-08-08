import React, { useState } from "react";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { BiSolidFolder } from "react-icons/bi";
import { isDirectory } from "../tools/file_helpers";
import ProjectSelectedDirTreeBuilder from "./ProjectSelectedDirTreeBuilder";

const ProjectDirContainer = ({ element, selectedDirTree }) => {
  const [selectedSubDir, setSelectedSubDir] = useState(null);
  const handleExpandDir = (e) => {
    if (selectedSubDir !== null) {
      setSelectedSubDir(null);
      return;
    }
    const curr_dir_name =
      e.currentTarget.nextSibling.nextSibling.nextSibling.textContent;
    let curr_dir_content = null;

    const stack = [];
    stack.push({ obj: selectedDirTree, parentKey: "" });

    while (stack.length > 0) {
      const { obj, parentKey } = stack.pop();

      if (curr_dir_content !== null) {
        break;
      }
      Object.keys(obj).forEach((key) => {
        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (
          currentKey.includes(curr_dir_name) &&
          isDirectory(curr_dir_name) &&
          curr_dir_content === null
        ) {
          currentKey.split(".").map((element) => {
            curr_dir_content = selectedDirTree[element];
          });
        }

        if (typeof obj[key] === "object" && obj[key] !== null) {
          stack.push({ obj: obj[key], parentKey: currentKey });
        }
      });
    }
    setSelectedSubDir(curr_dir_content);
  };

  return (
    <div className="path_container dir_path_container">
      <div className="root_container">
        <div className="dir_root_container">
          <div className="info_section ">
            <div className="card_animation">
              {selectedSubDir === null ? (
                <AiFillCaretRight
                  style={{ cursor: "pointer" }}
                  onClick={handleExpandDir}
                />
              ) : (
                <AiFillCaretDown
                  style={{ cursor: "pointer" }}
                  onClick={handleExpandDir}
                />
              )}

              <BiSolidFolder size={30} />
              <div className="image_name_spacer"></div>
              <p>{element}</p>
            </div>
          </div>
          <div className="subDir"></div>
        </div>
        <div className="sub_dir">
          {selectedSubDir !== null && (
            <ProjectSelectedDirTreeBuilder selectedDirTree={selectedSubDir} />
          )}
        </div>
      </div>
      <div className="card_decorator"></div>
    </div>
  );
};

export default ProjectDirContainer;
