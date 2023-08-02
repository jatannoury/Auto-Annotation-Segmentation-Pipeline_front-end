import React from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdPending } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const Project = ({ project_name, created_at, remaining, total, status }) => {
  let status_color_mapping = {
    Pending: "rgb(247, 151, 116)",
    Canceled: "red",
    Done: "green",
  };
  return (
    <div className="project">
      <div className="project_icon">
        <AiOutlineFundProjectionScreen size={30} />
      </div>
      <div className="project_info_section">
        <div>Project Name: {project_name}</div>
        <div>Created at: {created_at}</div>
      </div>
      <div className="project_info_section">
        <div>Remaining Images: {remaining} Images</div>
        <div>Total Images: {total} Images</div>
      </div>
      <div className="project_info_section status">
        <div className="status_p_tag">Status: {status} </div>
        <div style={{ color: status_color_mapping[status] }}>
          <MdPending />
        </div>
      </div>
      <div className="delte_icon">
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Project;
