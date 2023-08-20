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
  const { projects, isSuccess, isError } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    dispatch(get_projects(user.userId));
  }, []);
  useEffect(() => {
    dispatch(reset());
  }, [isError, isSuccess]);
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
