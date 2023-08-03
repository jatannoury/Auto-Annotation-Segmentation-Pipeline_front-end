import React from "react";
import { FaTrashAlt, FaHandPointRight } from "react-icons/fa";

const PointerContainer = ({ isHovered }) => {
  let classNaming = isHovered === false ? "none" : "flex";
  return (
    <div className="pointer_container" style={{ display: classNaming }}>
      <FaHandPointRight size={30} />
    </div>
  );
};

export default PointerContainer;
