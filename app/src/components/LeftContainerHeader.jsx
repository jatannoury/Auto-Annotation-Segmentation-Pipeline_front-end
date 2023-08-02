import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidUser } from "react-icons/bi";
const LeftContainerHeader = ({ burger_menu_handler }) => {
  return (
    <div>
      <div className="burger_menu_left_container">
        <div className="user_icon_container"></div>
        <RxHamburgerMenu size={30} onClick={burger_menu_handler} />
      </div>
      <div className="user_info">
        <div className="user_icon">
          <BiSolidUser />
        </div>
        <p className="user_name">Joseph Tannoury</p>
      </div>
    </div>
  );
};

export default LeftContainerHeader;
