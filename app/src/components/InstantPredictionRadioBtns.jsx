import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
const InstantPredictionRadioBtns = ({
  inputType,
  setInputType,
  close_input_image,
}) => {
  const handleToggle = (e) => {
    const id = e.target.id;
    if (id === "single" || id === "batch") {
      if (inputType === "single" && id === "single") {
        return;
      } else if (inputType === "batch" && id === "batch") {
        return;
      } else {
        setInputType(id);
        close_input_image();
      }
    }
  };
  return (
    <>
      <div className="checkbox_container">
        <div className="checkbox" id="single" onClick={handleToggle}>
          {inputType === "single" ? <BiCheck /> : null}
        </div>
        <div className="type">Single</div>
      </div>
      <div className="checkbox_container">
        <div className="checkbox" id="batch" onClick={handleToggle}>
          {inputType === "batch" && <BiCheck />}
        </div>
        <div className="type">Batch</div>
      </div>
    </>
  );
};

export default InstantPredictionRadioBtns;
