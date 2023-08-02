import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const HomeLeftContainer = ({ burger_menu_handler }) => {
  return (
    <div className="left_container">
      <div className="burger_menu_left_container">
        <RxHamburgerMenu size={30} onClick={burger_menu_handler} />
      </div>
    </div>
  );
};

export default HomeLeftContainer;
