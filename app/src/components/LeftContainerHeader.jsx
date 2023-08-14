import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

const LeftContainerHeader = ({ burger_menu_handler }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
        <p className="user_name">{`${user["firstName"]} ${user["lastName"]}`}</p>
      </div>
    </div>
  );
};

export default LeftContainerHeader;
