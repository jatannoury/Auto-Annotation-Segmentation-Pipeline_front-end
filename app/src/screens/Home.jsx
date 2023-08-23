import React, { useEffect, useState } from "react";
import "../styles/home.css";

import HomeLeftContainer from "../components/HomeLeftContainer";
import HomeRightContainer from "../components/HomeRightContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  create_project,
  get_projects,
  reset,
  empty_request_name,
} from "../redux/slicers/projects/projectSlice";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects, isSuccess, isError, request_name, message, isLoading } =
    useSelector((state) => state.projects);
  useEffect(() => {
    if (request_name !== "create_project") {
      return;
    }
    if (isError) {
      message?.map((err) => {
        toast.error(err.msg, {
          autoClose: 1000,
        });
        dispatch(reset());
      });
    } else if (isSuccess) {
      toast.success("Project Created", {
        autoClose: 1000,
      });

      dispatch(reset());
    } else if (isLoading) {
    }
    dispatch(empty_request_name());
  }, [isError, isSuccess, projects]);
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
