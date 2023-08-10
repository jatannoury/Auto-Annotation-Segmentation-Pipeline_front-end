import React, { useState } from "react";
import "../styles/in_progress.css";
import Charts from "./Charts";
import ProjectResults from "./ProjectResults";

const InProgressProject = ({ projectInfo, handleViewResults }) => {
  return (
    <>
      <div className="in_progress_main_container">
        <div className="view_prediction">
          <div
            className={`view_prediction_btn ${
              projectInfo["status"] !== "Done" && "pending_state"
            }`}
            onClick={handleViewResults}
          >
            View
          </div>
        </div>
        <div className="progress_info_row">
          <div className="info_conatiner">
            <div className="info_header">Files Processed</div>
            <div className="info">
              <Charts chartType={"pie"} />
            </div>
          </div>
          <div className="info_conatiner">
            <div className="info_header">Files Type Distribution</div>
            <div className="info">
              <Charts chartType={"horizontal_bar"} />
            </div>
          </div>
          <div className="info_conatiner">
            <div className="info_header">Files size distribution</div>
            <div className="info">
              <Charts chartType={"vertical_bar"} />
            </div>
          </div>
        </div>
        <div className="progress_info_row">
          <div className="info_conatiner">
            <div className="info_header">Files Processing Time</div>
            <div className="info">
              <Charts chartType={"line"} />
            </div>
          </div>
          <div className="info_conatiner">
            <div className="info_header">Elapsed Time</div>
            <div className="info">
              <div className="text_info">
                <div className="elapsed_time_card">
                  <div>02</div>
                  <p className="time_elapsed_description">Days</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>13</div>
                  <p className="time_elapsed_description">Hours</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>54</div>
                  <p className="time_elapsed_description">Minutes</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>33</div>
                  <p className="time_elapsed_description">Seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info_conatiner">
            <div className="info_header">Total Number Of Images</div>
            <div className="info">
              <div className="nb_imgs_info">10,000</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InProgressProject;
