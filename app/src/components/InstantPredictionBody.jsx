import React, { useEffect, useState } from "react";
import { SiConvertio } from "react-icons/si";

import { useSelector, useDispatch } from "react-redux";
import {
  instant_batch_prediction,
  reset,
  instant_prediction,
} from "../redux/slicers/prediction/predictionSlice";
import { toast } from "react-toastify";
import { findOldestAndNewestTimestamps } from "../tools/datetime_helpers";
import InstantPredictionLeftContainer from "./InstantPredictionLeftContainer";
const InstantPredictionBody = ({
  setSelectedImage,
  selectedImage,
  predictedImage,
  inputType,
  setInputType,
  setPredictedImage,
  rawImage,
  setRawImage,
  close_input_image,
  selectedDir,
  setSelectedDir,
  setPredictedImages,
  predictedImages,
  predictedImagesCounter,
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  function getTotalFileSize(fileList) {
    let totalSize = 0;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      totalSize += file.size;
    }

    return (totalSize / (1024 * 1024)).toFixed(5);
  }
  const { request_name, isLoading, isError, isSuccess, message, data } =
    useSelector((state) => state.prediction);
  const animate_btn = (e) => {
    setIsHovered(true);
  };
  const stop_btn_animation = (e) => {
    setIsHovered(false);
  };
  useEffect(() => {
    if (request_name !== "instant_prediction") {
      return;
    }
    if (isError) {
      setTimeout(() => {
        stop_btn_animation();
      }, 1000);
      toast.error("Request not successfull", {
        autoClose: 2000,
      });
    } else if (isSuccess) {
      setTimeout(() => {
        stop_btn_animation();
        setPredictedImage(`data:image/jpeg;base64,${data}`);
        toast.success("Success", {
          autoClose: 2000,
        });
      }, 1000);
    }
    dispatch(reset());
  }, [isError, isSuccess]);
  useEffect(() => {
    if (request_name !== "instant_batch_prediction") {
      return;
    }
    if (isError) {
      setTimeout(() => {
        stop_btn_animation();
      }, 1000);
      toast.error("Request not successfull", {
        autoClose: 2000,
      });
    } else if (isSuccess) {
      stop_btn_animation();
      toast.success("Success", {
        autoClose: 2000,
      });
      let polished_data = [...data].map(
        (element) => `data:image/jpeg;base64,${element}`
      );
      setPredictedImages(polished_data);
    }
    stop_btn_animation();

    dispatch(reset());
  }, [isError, isSuccess]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setRawImage(file);
    console.log(event.target.files[0]);
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleDirChange = (event) => {
    const files = event.target.files;
    const oldest_and_newest = setSelectedDir({
      nb_of_files: event.target.files.length,
      ...findOldestAndNewestTimestamps(files),
      "total_size(MB)": getTotalFileSize(files),
      "total_size(GB)": (getTotalFileSize(files) / 1024).toFixed(5),
      data: files,
    });
    console.log({
      nb_of_files: event.target.files.length,
      ...findOldestAndNewestTimestamps(files),
      "total_size(MB)": getTotalFileSize(files),
      "total_size(GB)": (getTotalFileSize(files) / 1024).toFixed(5),
    });
  };

  const handleInstantPrediction = () => {
    if (rawImage === null && selectedDir === null) {
      toast.error("Please input an image", {
        autoClose: 3000,
      });
      return;
    }
    if (rawImage !== null && selectedDir !== null) {
      toast.error("Confusion - Two predictions at a time!!", {
        autoClose: 3000,
      });
      return;
    }
    animate_btn();
    if (selectedDir !== null && rawImage === null) {
      console.log(selectedDir);
      const formData = new FormData();
      console.log(selectedDir.data);
      
      Object.keys(selectedDir.data).forEach((file, index) => {
        console.log(file);
        formData.append(
          `file_uploads`,
          selectedDir.data[file],
          selectedDir.data[file].name
        );
      });
      dispatch(instant_batch_prediction(formData));
      return;
    }

    const formData = new FormData();
    formData.append("file", rawImage, rawImage.name);
    dispatch(instant_prediction(formData));
  };
  return (
    <div className="images_placeholder_container">
      <InstantPredictionLeftContainer
        selectedImage={selectedImage}
        predictedImage={predictedImage}
        inputType={inputType}
        setInputType={setInputType}
        selectedDir={selectedDir}
        handleDirChange={handleDirChange}
        handleImageChange={handleImageChange}
        close_input_image={close_input_image}
      />
      <div className="convert_container">
        <div onClick={handleInstantPrediction}>
          <SiConvertio
            size={50}
            className={`${
              isHovered === true ? "siconvertio" : "stop_animation"
            }`}
          />
        </div>
      </div>

      <div className="placeholder">
        {predictedImages !== null ? (
          <img src={predictedImages[predictedImagesCounter]} alt="Selected" />
        ) : predictedImage !== null ? (
          <img src={`${predictedImage}`} alt="Selected" />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default InstantPredictionBody;
