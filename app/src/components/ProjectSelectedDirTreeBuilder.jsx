import React from "react";
import { BiSolidImage, BiSolidFolder } from "react-icons/bi";
import { file_dir_sort } from "../tools/file_helpers";
import ProjectDirContainer from "./ProjectDirContainer";
const ProjectSelectedDirTreeBuilder = ({ selectedDirTree }) => {
  return (
    <>
      {selectedDirTree &&
        Object.keys(selectedDirTree)
          .sort(file_dir_sort)
          .map((element) => {
            // return <div className="root_dir"></div>;
            if (selectedDirTree[element]["webkitRelativePath"]) {
              return (
                <div className="path_container">
                  <div className="info_section">
                    <div className="left_bndry_image_spacer"></div>

                    <div className="card_animation">
                      <BiSolidImage size={30} />
                      <div className="image_name_spacer"></div>
                      <p>{selectedDirTree[element].name}</p>
                    </div>
                    <div className="card_info_1">
                      <div className="card_info_1_2nd_child">
                        <div>
                          Size (KB):{" "}
                          {(selectedDirTree[element].size / 1024).toFixed(5)} KB
                        </div>
                      </div>
                      <div>
                        Created At:{" "}
                        {new Date(
                          selectedDirTree[element]["lastModified"]
                        ).toISOString()}
                      </div>
                    </div>
                    <div className="card_info_2">
                      <div className="card_info_1_2nd_child">
                        <div>
                          Image Type:{" "}
                          {selectedDirTree[element].type
                            .split("/")[1]
                            .toUpperCase()}{" "}
                        </div>
                      </div>
                      <div>
                        Created At:{" "}
                        {new Date(
                          selectedDirTree[element]["lastModified"]
                        ).toISOString()}
                      </div>
                    </div>
                  </div>
                  <div className="card_decorator"></div>
                </div>
              );
            } else {
              return (
                <ProjectDirContainer
                  element={element}
                  selectedDirTree={selectedDirTree}
                />
              );
            }
            // console.log(typeof selectedDirTree[element]);
          })}
    </>
  );
};

export default ProjectSelectedDirTreeBuilder;
