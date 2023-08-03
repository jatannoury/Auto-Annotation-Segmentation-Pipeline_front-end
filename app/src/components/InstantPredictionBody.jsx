import React, { useState } from "react";
import { SiConvertio } from "react-icons/si";
import { RiFileAddLine } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
const InstantPredictionBody = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const animate_btn = (e) => {
    setIsHovered(true);
  };
  const stop_btn_animation = (e) => {
    setIsHovered(false);
  };

  return (
    <div className="images_placeholder_container">
      <div className="placeholder">
        <div className="custom-file-input-container">
          <label htmlFor="fileInput" className="file-label">
            <RiFileAddLine
              size={30}
              className={`file-icon ${selectedImage ? "display-none" : ""}`}
            />
            <p className={`${selectedImage ? "display-none" : ""}`}>
              Choose a file
            </p>
          </label>
          <input
            type="file"
            id="fileInput"
            className={`file-input ${selectedImage ? "display-none" : ""}`}
            onChange={handleImageChange}
          />
          {selectedImage && <img src={selectedImage} alt="Selected" />}
        </div>
      </div>
      <div className="convert_container">
        <div onMouseEnter={animate_btn} onMouseLeave={stop_btn_animation}>
          <SiConvertio
            size={50}
            className={`${
              isHovered === true ? "siconvertio" : "stop_animation"
            }`}
          />
        </div>
      </div>

      <div className="placeholder"></div>
    </div>
  );
};

export default InstantPredictionBody;
