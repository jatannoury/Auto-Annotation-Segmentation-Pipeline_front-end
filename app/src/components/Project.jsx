import React, { useEffect, useState } from "react";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdPending } from "react-icons/md";
import {
  BsFillCloudyFill,
  BsServer,
  BsFillLockFill,
  BsFillUnlockFill,
} from "react-icons/bs";
import { FaTrashAlt, FaHandPointRight } from "react-icons/fa";

import PointerContainer from "./PointerContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  delete_project,
  reset,
  empty_request_name,
  authenticate_project,
} from "../redux/slicers/projects/projectSlice";
import { toast } from "react-toastify";

const Project = ({
  project_name,
  project_id,
  created_at,
  remaining,
  total,
  status,
  storage,
  isProtected,
  setProjectClicked,
  setClickedProjectId,
  handleNavigate,
  setIsclickedProjectProtected,
}) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [projectId, setProjectId] = useState(project_id);
  const delete_project_by_id = (e) => {
    if (e.target instanceof SVGElement) {
      dispatch(delete_project(projectId));
    }
  };
  const { isError, isSuccess, request_name, message } = useSelector(
    (state) => state.projects
  );

  let status_color_mapping = {
    Pending: "rgb(247, 151, 116)",
    Canceled: "red",
    Done: "green",
  };
  const show_pointer = (e) => {
    setIsHovered(true);
  };
  const hide_pointer = (e) => {
    setIsHovered(false);
  };
  const handleLocalNavigate = (e) => {
    if (e.target instanceof SVGElement) {
      return;
    }
    setIsclickedProjectProtected(isProtected);
    setClickedProjectId(project_id);

    handleNavigate(e, project_id, isProtected);
  };
  return (
    <div className="project_container">
      <PointerContainer isHovered={isHovered} />
      <div
        className="project"
        onMouseEnter={show_pointer}
        onMouseLeave={hide_pointer}
        onClick={handleLocalNavigate}
      >
        <div className="project_icon">
          <AiOutlineFundProjectionScreen size={30} />
        </div>
        <div className="project_info_section">
          <div>Name: {project_name}</div>
          <div>Created at: {created_at}</div>
        </div>
        <div className="project_info_section">
          <div>Remaining Images: {remaining ? remaining : 0} Images</div>
          <div>Total Images: {total ? total : 0} Images</div>
        </div>
        <div className="project_info_section">
          <div className="status">
            <div className="status_p_tag">Status: {status} </div>
            <div style={{ color: status_color_mapping[status] }}>
              <div className="status_icon">
                <MdPending />
              </div>
            </div>
          </div>
          <div className="status">
            <div className="status_p_tag">Storage: {storage} </div>
            <div style={{ color: status_color_mapping[status] }}>
              <div className="storage_icon">
                {storage === "Cloud" ? <BsFillCloudyFill /> : <BsServer />}
              </div>
            </div>
          </div>
        </div>
        <div className={`delte_icon_container ${projectId}`}>
          {isProtected === true ? (
            <BsFillLockFill size={20} />
          ) : (
            <BsFillUnlockFill size={20} />
          )}
          <FaTrashAlt
            onClick={delete_project_by_id}
            size={20}
            className="delte_icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
