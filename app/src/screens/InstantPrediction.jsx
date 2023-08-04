import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

import { MdOutlineClose } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { saveAs } from "file-saver"; // This is a popular library for file downloads

import "../styles/instant_prediction.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import InstantPredictionHeader from "../components/InstantPredictionHeader";
import InstantPredictionBody from "../components/InstantPredictionBody";
import InstantPredictionRadioBtns from "../components/InstantPredictionRadioBtns";
const InstantPrediction = () => {
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDir, setSelectedDir] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [inputType, setInputType] = useState("single");
  const [predictedImages, setPredictedImages] = useState(null);
  const [predictedImagesCounter, setPredictedImagesCounter] = useState(0);

  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  const handleNextImage = (e) => {
    if (predictedImagesCounter === predictedImages.length - 1) {
      return;
    }
    setPredictedImagesCounter(predictedImagesCounter + 1);
  };
  const handlePrevImage = (e) => {
    if (predictedImagesCounter === 0) {
      return;
    }
    setPredictedImagesCounter(predictedImagesCounter - 1);
  };
  const close_input_image = () => {
    setSelectedImage(null);
    setRawImage(null);
    setPredictedImage(null);
    setSelectedDir(null);
    setPredictedImages(null);
    document.getElementById("fileInput").value = "";
  };
  const close_output_image = () => {
    setPredictedImage(null);
  };
  const downloadPrediction = () => {
    saveAs(predictedImage, "image.jpg");
  };
  return (
    <div className="main_container">
      {burgerMenuClicked === true ? (
        <HomeLeftContainer
          burger_menu_handler={burger_menu_handler}
          burgerMenuClicked={burgerMenuClicked}
        />
      ) : (
        <></>
      )}
      <div className="right_main_container">
        <div className="right_container">
          {burgerMenuClicked === false ? (
            <RxHamburgerMenu
              size={30}
              onClick={burger_menu_handler}
              className="burger_menu_right_container"
            />
          ) : (
            <div className="burger_menu_placeholder"></div>
          )}
          <InstantPredictionHeader close_input_image={close_input_image} />
          <div className="buttons_main_container">
            <div className="buttons">
              <div className="button_container">
                <div className="input_type">
                  <div className="input_buttons">
                    <InstantPredictionRadioBtns
                      inputType={inputType}
                      setInputType={setInputType}
                      close_input_image={close_input_image}
                    />
                  </div>
                </div>
                <div>
                  <MdOutlineClose
                    size={20}
                    className="button"
                    onClick={close_input_image}
                  />
                </div>
              </div>
              <div className="button_container">
                <div className="right_buttons">
                  <GoDownload
                    size={20}
                    className="button"
                    onClick={downloadPrediction}
                  />
                  <MdOutlineClose
                    size={20}
                    className="button"
                    onClick={close_output_image}
                  />
                </div>
              </div>
            </div>
          </div>
          <InstantPredictionBody
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            predictedImage={predictedImage}
            setPredictedImage={setPredictedImage}
            rawImage={rawImage}
            setRawImage={setRawImage}
            inputType={inputType}
            setInputType={setInputType}
            selectedDir={selectedDir}
            setSelectedDir={setSelectedDir}
            close_input_image={close_input_image}
            setPredictedImages={setPredictedImages}
            predictedImages={predictedImages}
            predictedImagesCounter={predictedImagesCounter}
          />

          {predictedImages && (
            <div className="next_btn_root_container">
              <div className="next_button_main_container">
                <div className="btns_container">
                  {predictedImagesCounter > 0 ? (
                    <div className="next_btn" onClick={handlePrevImage}>
                      <BiSkipPrevious size={50} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {predictedImagesCounter < predictedImages.length - 1 ? (
                    <div className="next_btn" onClick={handleNextImage}>
                      <BiSkipNext size={50} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstantPrediction;
