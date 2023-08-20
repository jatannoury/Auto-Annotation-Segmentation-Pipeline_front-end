import React from "react";
import { BsImage } from "react-icons/bs";

const ImageLoader = () => {
  return (
    <>
      <div className="image_name loader_bg">
        <div className="name"></div>
      </div>
      <div className="result_row">
        <div className="image image_left" style={{ borderColor: "grey" }}>
          <span className="loader">
            <BsImage className="loader" size={100} />
          </span>
        </div>

        <div className="image image_right" style={{ borderColor: "grey" }}>
          <span className="loader">
            <BsImage className="loader" size={100} />
          </span>
        </div>
      </div>
      <div className="image_name loader_bg" style={{ borderColor: "grey" }}>
        <div className="name"></div>
      </div>
      <div className="result_row">
        <div className="image image_left" style={{ borderColor: "grey" }}>
          <span className="loader">
            <BsImage className="loader" size={100} />
          </span>
        </div>
        <div className="image image_right" style={{ borderColor: "grey" }}>
          <span className="loader">
            <BsImage className="loader" size={100} />
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageLoader;
