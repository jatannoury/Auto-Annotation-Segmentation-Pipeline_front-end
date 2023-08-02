import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LeftContainerSection = ({ placeholder, icon, route }) => {
  const navigate = useNavigate();
    const redirect_to = ()=>{
        navigate(route)
    }
  return (
    <div className="section" onClick={redirect_to}>
      {icon}
      <p>{placeholder}</p>
    </div>
  );
};

export default LeftContainerSection;
