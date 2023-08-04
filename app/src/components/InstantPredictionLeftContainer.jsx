import React from "react";
import { RiFileAddLine } from "react-icons/ri";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { MdStorage } from "react-icons/md";
import { GoNumber } from "react-icons/go";
const InstantPredictionLeftContainer = ({
  selectedImage,
  predictedImage,
  inputType,
  setInputType,
  selectedDir,
  handleDirChange,
  handleImageChange,
}) => {
  return (
    <div className="placeholder">
      <div className="custom-file-input-container">
        <label
          htmlFor="fileInput"
          className={`file-label ${
            selectedImage || selectedDir ? "display-none" : ""
          }`}
        >
          <RiFileAddLine
            size={30}
            className={`file-icon ${
              selectedImage || selectedDir ? "display-none" : ""
            }`}
          />
          <p className={`${selectedImage ? "display-none" : ""}`}>
            Choose a {inputType === "single" ? "file" : "folder"}
          </p>
        </label>
        <form>
          {inputType === "single" ? (
            <input
              type="file"
              id="fileInput"
              accept=".jpeg, .png, .jpg,.avif"
              className={`file-input ${
                selectedImage || selectedDir ? "display-none" : ""
              }`}
              onChange={handleImageChange}
            />
          ) : (
            <input
              directory=""
              webkitdirectory=""
              type="file"
              id="fileInput"
              accept=".jpeg, .png, .jpg,.avif"
              className={`file-input ${
                selectedImage || selectedDir ? "display-none" : ""
              }`}
              onChange={handleDirChange}
            />
          )}
        </form>
        {selectedImage && inputType === "single" ? (
          <img src={selectedImage} alt="Selected" />
        ) : selectedDir && inputType === "batch" ? (
          <div className="sleected_dir_info">
            <div className="info">
              <div className="single_info">
                <GoNumber size={25} />
              </div>
              <div className="single_info">
                Number Of Files : {selectedDir["nb_of_files"]}
              </div>
            </div>
            <div className="info">
              <div className="single_info">
                <BiDownArrowAlt size={25} />
              </div>
              <div className="single_info">
                Oldest : {selectedDir["oldest"]}
              </div>
            </div>
            <div className="info">
              <div className="single_info">
                <BiUpArrowAlt size={25} />
              </div>
              <div className="single_info">
                Newest : {selectedDir["newest"]}
              </div>
            </div>
            <div className="info">
              <div className="single_info">
                <MdStorage size={25} />
              </div>
              <div className="single_info">
                Size(GB) : {selectedDir["total_size(GB)"]}
              </div>
            </div>
            <div className="info">
              <div className="single_info">
                <MdStorage size={25} />
              </div>
              <div className="single_info">
                Size(MB): {selectedDir["total_size(MB)"]}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InstantPredictionLeftContainer;
