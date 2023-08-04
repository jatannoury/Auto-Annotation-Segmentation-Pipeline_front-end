import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { MdOutlineClose } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { saveAs } from "file-saver"; // This is a popular library for file downloads

import "../styles/instant_prediction.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import InstantPredictionHeader from "../components/InstantPredictionHeader";
import InstantPredictionBody from "../components/InstantPredictionBody";
const InstantPrediction = () => {
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
    const [rawImage, setRawImage] = useState(false);

  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  const close_input_image = () => {
    setSelectedImage(null);
    setRawImage(null)
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
          <InstantPredictionHeader />
          <div className="buttons_main_container">
            <div className="buttons">
              <div className="button_container">
                <MdOutlineClose
                  size={20}
                  className="button"
                  onClick={close_input_image}
                />
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
          />
        </div>
      </div>
    </div>
  );
};

export default InstantPrediction;
