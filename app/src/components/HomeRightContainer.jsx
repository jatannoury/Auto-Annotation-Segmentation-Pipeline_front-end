import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HomeRightContainer = ({ burger_menu_handler, burgerMenuClicked }) => {
  return (
    <div
      className={`right_container ${
        burgerMenuClicked === true ? "clicked_menu" : "unclicked_menu"
      }`}
    >
      <RxHamburgerMenu size={30} onClick={burger_menu_handler} className="burger_menu_right_container"/>
    </div>
  );
};

export default HomeRightContainer;
