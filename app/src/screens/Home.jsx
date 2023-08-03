import React, { useState } from "react";
import "../styles/home.css";

import HomeLeftContainer from "../components/HomeLeftContainer";
import HomeRightContainer from "../components/HomeRightContainer";
const Home = () => {
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);

  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  return (
    <div className="home">
      {burgerMenuClicked === true ? (
        <HomeLeftContainer
          burger_menu_handler={burger_menu_handler}
          burgerMenuClicked={burgerMenuClicked}
        />
      ) : (
        <></>
      )}
      <HomeRightContainer
        burger_menu_handler={burger_menu_handler}
        burgerMenuClicked={burgerMenuClicked}
      />
    </div>
  );
};

export default Home;
