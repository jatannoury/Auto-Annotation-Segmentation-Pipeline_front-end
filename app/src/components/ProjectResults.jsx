import React, { useEffect, useState } from "react";
import "../styles/results.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import s3_controller from "../tools/s3_controller";
import dynamoDB_controller from "../tools/dynamo_db_controller";
import ImageLoader from "./ImageLoader";
const ProjectResults = ({
  setViewResults,
  projectInfo,
  indexNumber,
  aggregatedInputData,
  setAggregatedInputData,
  aggregatedOutputData,
  setAggregatedOutputData,
}) => {
  const [doneProjectInfo, setDoneProjectInfo] = useState(null);
  const [inputKeys, setInputKeys] = useState(null);
  const [outputKeys, setOutputKeys] = useState(null);
  console.log(projectInfo);
  const handleBackToInfo = () => {
    setViewResults(false);
  };
  useEffect(() => {
    if (projectInfo === false) {
      return;
    }
    let running_project_info;

    const get_project_info = async () => {
      let input_keys;
      let output_keys;
      running_project_info =
        await dynamoDB_controller.get_predicted_project_info(
          projectInfo["project_id"],
          projectInfo["userId"]
        );
      if (inputKeys === null) {
        setDoneProjectInfo(running_project_info);
        input_keys = await s3_controller.get_objects_with_key(
          `${projectInfo["userId"]}/${running_project_info[0]["project_name"]["S"]}/`
        );
        setInputKeys(input_keys);
        output_keys = await s3_controller.get_objects_with_key(
          `${projectInfo["userId"]}/${running_project_info[0]["project_name"]["S"]}_DONE/`
        );
        setOutputKeys(output_keys);
      }
      let output_data = [];
      let input_data = [];
      let inputs = inputKeys || input_keys;
      let outputs = outputKeys || output_keys;
      for (const element of outputs.Contents) {
        if (outputs.Contents.indexOf(element) === indexNumber) {
          break;
        } else {
          output_data.push(
            await s3_controller.get_object_content(element["Key"])
          );
        }
      }

      for (const element of inputs.Contents) {
        if (inputs.Contents.indexOf(element) === indexNumber) {
          break;
        } else {
          input_data.push(
            await s3_controller.get_object_content(element["Key"])
          );
        }
      }

      setAggregatedInputData(input_data);
      setAggregatedOutputData(output_data);
    };
    get_project_info();
    //
    return;
  }, [indexNumber, projectInfo]);
  return (
    <div className="results_main_container">
      <div className="return_to_view">
        <div className="return_to_info" onClick={handleBackToInfo}>
          <AiOutlineArrowLeft size={25} />
        </div>
        <div
          className={`download_results ${
            projectInfo["storageType"] === "Cloud" ? "display_none" : ""
          }`}
        >
          Download Results
        </div>
      </div>
      <div className="results_viewer">
        {aggregatedInputData !== null && inputKeys !== null ? (
          aggregatedInputData.map((element, index) => {
            let uint8Array = new Uint8Array(element.Body);
            let base64String = btoa(String.fromCharCode(...uint8Array));
            let input_data_url = `data:image/jpeg;base64,${base64String}`;
            uint8Array = new Uint8Array(aggregatedOutputData[index].Body);
            const splitted_key = inputKeys?.Contents[index]["Key"].split("/");
            const input_img_name = splitted_key[splitted_key?.length - 1];
            base64String = btoa(String.fromCharCode(...uint8Array));
            let output_data_url = `data:image/jpeg;base64,${base64String}`;

            return (
              <>
                <div className="image_name">
                  <div className="name">{input_img_name}</div>
                </div>
                <div className="result_row">
                  <div className="image image_left">
                    <img src={input_data_url} alt="" />
                  </div>
                  <div className="image image_right">
                    <img src={output_data_url} alt="" />
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <ImageLoader />
        )}
      </div>
    </div>
  );
};

export default ProjectResults;
