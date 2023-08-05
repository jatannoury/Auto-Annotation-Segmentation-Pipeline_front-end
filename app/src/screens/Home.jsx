import React, { useEffect, useState } from "react";
import "../styles/home.css";

import HomeLeftContainer from "../components/HomeLeftContainer";
import HomeRightContainer from "../components/HomeRightContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  create_project,
  get_projects,
  reset,
} from "../redux/slicers/projects/projectSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(get_projects(user.userId));
    // dispatch();
    // create_project({
    //   projectName: "Josephtannoury@outlook.com",
    //   totalNumber: 0,
    //   password: "22Q1D99Z",
    //   userId: "83f003ef-849f-43b5-bc85-191528e46492",
    //   protect: "Yes",
    //   storageType: "Cloud",
    //   status: "Pending",
    // })
  }, []);
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
