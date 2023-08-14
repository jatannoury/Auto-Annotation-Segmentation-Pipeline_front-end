import React, { useEffect, useState } from "react";
import "../styles/in_progress.css";
import Charts from "./Charts";
import ProjectResults from "./ProjectResults";
import s3_controller from "../tools/s3_controller";
import dynamoDB_controller from "../tools/dynamo_db_controller";

const InProgressProject = ({
  projectInfo,
  setProjectInfo,
  handleViewResults,
}) => {
  const [totalNumber, setTotalNumber] = useState(0);
  const [processedNumber, setProcessedNumber] = useState(0);
  const [fileTypeDistribution, setFileTypeDistribution] = useState({});
  const [fileSizeDistribution, setFileSizeDistribution] = useState({});
  const [timeDistribution, setTimeDistribution] = useState({});
  const [runningProjectInfo, setRunningProjectInfo] = useState({});
  useEffect(() => {
    if (timeDistribution === {}) {
      return;
    }
    if (
      runningProjectInfo.hasOwnProperty("finished_at") &&
      runningProjectInfo["finished_at"]["S"].length > 0
    ) {
      return;
    }
    const interval = setInterval(() => {
      console.log(runningProjectInfo);
      const targetTime = new Date(
        runningProjectInfo.hasOwnProperty("created_at") &&
        runningProjectInfo["created_at"]["S"].length > 0
          ? runningProjectInfo["created_at"]["S"]
          : projectInfo["createdAt"]
      );
      const currentTime = new Date();
      targetTime.setSeconds(targetTime.getSeconds() + 1); // Add 1 second to targetTime

      const currentTimeUTC = new Date(
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        currentTime.getUTCHours(),
        currentTime.getUTCMinutes(),
        currentTime.getUTCSeconds()
      );

      const timeDifference = currentTimeUTC.getTime() - targetTime.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeDistribution({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000); // 1000 milliseconds = 1 second

    return () => {
      clearInterval(interval); // Clear interval when component unmounts
    };
  }, [timeDistribution]);
  useEffect(() => {
    if (projectInfo === false) {
      return;
    }
    let running_project_info;
    const get_project_info = async () => {
      running_project_info =
        await dynamoDB_controller.get_predicted_project_info(
          projectInfo["project_id"],
          projectInfo["userId"]
        );
      console.log(running_project_info);
      setRunningProjectInfo(running_project_info[0]);
      let input_keys = await s3_controller.get_objects_with_key(
        `${projectInfo["userId"]}/${running_project_info[0]["project_name"]["S"]}/`
      );
      let output_keys = await s3_controller.get_objects_with_key(
        `${projectInfo["userId"]}/${running_project_info[0]["project_name"]["S"]}_DONE/`
      );

      setTotalNumber(input_keys.Contents.length);
      setProcessedNumber(output_keys.Contents.length);
      let files_type_distribution = {};
      let files_size_distribution = {};
      input_keys.Contents.map((element) => {
        let splitted = element["Key"].split("/");
        let size = element["Size"].toString();
        let extension = splitted[splitted.length - 1].split(".")[1];
        if (files_size_distribution.hasOwnProperty(size)) {
          files_size_distribution[size] += 1;
        } else {
          files_size_distribution[size] = 1;
        }

        if (files_type_distribution.hasOwnProperty(extension)) {
          files_type_distribution[extension] += 1;
        } else {
          files_type_distribution[extension] = 1;
        }
      });
      setFileTypeDistribution(
        Object.keys(files_type_distribution).map((element) => {
          return {
            name: element,
            count: files_type_distribution[element],
          };
        })
      );
      setFileSizeDistribution(
        Object.keys(files_size_distribution).map((element) => {
          return {
            name: element,
            count: files_size_distribution[element],
          };
        })
      );
      running_project_info = running_project_info[0];
      console.log(running_project_info);
      const targetTime = new Date(
        running_project_info.hasOwnProperty("created_at") &&
        running_project_info["created_at"]["S"].length > 0
          ? running_project_info["created_at"]["S"]
          : projectInfo["createdAt"]
      );
      let currentTimeUTC;
      let timeDifference;
      if (
        running_project_info.hasOwnProperty("finished_at") &&
        running_project_info["finished_at"]["S"].length > 0
      ) {
        console.log("FINISHED AT", running_project_info["finished_at"]);
        currentTimeUTC = new Date(running_project_info["finished_at"]["S"]);
        timeDifference = currentTimeUTC.getTime() - targetTime.getTime();
        console.log(timeDifference); // Difference in milliseconds
      } else {
        const currentTime = new Date();

        currentTimeUTC = new Date(
          currentTime.getUTCFullYear(),
          currentTime.getUTCMonth(),
          currentTime.getUTCDate(),
          currentTime.getUTCHours(),
          currentTime.getUTCMinutes(),
          currentTime.getUTCSeconds()
        );
        timeDifference = currentTimeUTC.getTime() - targetTime.getTime(); // Difference in milliseconds
        console.log(timeDifference); // Difference in milliseconds
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeDistribution({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    };

    get_project_info();

    return;
  }, [projectInfo]);
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
              <Charts
                chartType={"pie"}
                data={[
                  { name: "Processed", value: processedNumber },
                  { name: "Unprocessed", value: totalNumber - processedNumber },
                ]}
              />
            </div>
          </div>
          <div className="info_conatiner">
            <div className="info_header">Files Type Distribution</div>
            <div className="info">
              <Charts
                chartType={"horizontal_bar"}
                data={fileTypeDistribution}
              />
            </div>
          </div>
          <div className="info_conatiner">
            <div className="info_header">Files size distribution</div>
            <div className="info">
              <Charts chartType={"vertical_bar"} data={fileSizeDistribution} />
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
                  <div>
                    {timeDistribution["days"] ? timeDistribution["days"] : 0}
                  </div>
                  <p className="time_elapsed_description">Days</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>
                    {timeDistribution["hours"] ? timeDistribution["hours"] : 0}
                  </div>
                  <p className="time_elapsed_description">Hours</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>
                    {timeDistribution["minutes"]
                      ? timeDistribution["minutes"]
                      : 0}
                  </div>
                  <p className="time_elapsed_description">Minutes</p>
                </div>
                :
                <div className="elapsed_time_card">
                  <div>
                    {timeDistribution["seconds"]
                      ? timeDistribution["seconds"]
                      : 0}
                  </div>
                  <p className="time_elapsed_description">Seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info_conatiner">
            <div className="info_header">Total Number Of Images</div>
            <div className="info">
              <div className="nb_imgs_info">{totalNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InProgressProject;
