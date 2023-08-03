import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { MdOutlineClose } from "react-icons/md";
import { GoDownload } from "react-icons/go";

import "../styles/instant_prediction.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import InstantPredictionHeader from "../components/InstantPredictionHeader";
import InstantPredictionBody from "../components/InstantPredictionBody";
const InstantPrediction = () => {
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
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
          <InstantPredictionHeader/>
          <div className="buttons_main_container">
            <div className="buttons">
              <div className="button_container">
                <MdOutlineClose size={20} className="button" />
              </div>
              <div className="button_container">
                <div className="right_buttons">
                  <GoDownload size={20} className="button" />
                  <MdOutlineClose size={20} className="button" />
                </div>
              </div>
            </div>
          </div>
          <InstantPredictionBody/>
        </div>
      </div>
    </div>
  );
};

export default InstantPrediction;
