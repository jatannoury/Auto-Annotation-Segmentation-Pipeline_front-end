import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillFileAdd } from "react-icons/ai";
import Project from "./Project";
import Modal from "../screens/Modal";
import CreateProject from "./CreateProject";

const HomeRightContainer = ({ burger_menu_handler, burgerMenuClicked }) => {
  const [createProjectClicked, setCreateProjectClicked] = useState(false);
  const [createProjectRequest, setCreateProjectRequest] = useState(false);
  const toggleCreateBtn = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (createProjectClicked === true && e.target.className === "submit") {
      setCreateProjectRequest(true);
    }
    setCreateProjectClicked(!createProjectClicked);
  };
  let dummy_data = [
    {
      project_name: "Car Bounder Box",
      created_at: "17/04/2023 20:00:00",
      total_images: 100,
      remaining_images: 90,
      status: "Pending",
    },
    {
      project_name: "Toy Bounder Box",
      created_at: "18/05/2023 21:04:00",
      total_images: 500,
      remaining_images: 247,
      status: "Done",
    },
    {
      project_name: "Creme Bounder Box",
      created_at: "19/05/2023 17:05:08",
      total_images: 327,
      remaining_images: 152,
      status: "Canceled",
    },
    {
      project_name: "House Bounder Box",
      created_at: "20/06/2023 10:40:15",
      total_images: 841,
      remaining_images: 49,
      status: "Pending",
    },
    {
      project_name: "Laptop Bounder Box",
      created_at: "21/03/2023 8:27:14",
      total_images: 998,
      remaining_images: 555,
      status: "Done",
    },
  ];
  useEffect(() => {
    
  }, []);
  return (
    <div className="right_container_root">
      <Modal show={createProjectClicked} handleClose={toggleCreateBtn}>
        <CreateProject
          toggleCreateBtn={toggleCreateBtn}
          createProjectRequest={createProjectRequest}
          setCreateProjectRequest={setCreateProjectRequest}
        />
      </Modal>
      <div>
        {burgerMenuClicked === false ? (
          <RxHamburgerMenu
            size={30}
            onClick={burger_menu_handler}
            className="burger_menu_right_container"
          />
        ) : (
          <div className="burger_menu_placeholder"></div>
        )}
      </div>
      <div className="right_container_main">
        <div className="right_container_content">
          <div className="right_container_header">Projects</div>
          <div className="create_project">
            <div className="create_project_btn" onClick={toggleCreateBtn}>
              <AiFillFileAdd />

              <p>Create Project</p>
            </div>
          </div>
          <div className="projects">
            {dummy_data.map((project) => {
              return (
                <Project
                  project_name={project["project_name"]}
                  created_at={project["created_at"]}
                  remaining={project["remaining"]}
                  total={project["total"]}
                  status={project["status"]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRightContainer;
