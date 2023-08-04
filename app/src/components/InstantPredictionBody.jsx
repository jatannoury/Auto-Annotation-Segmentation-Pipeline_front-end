import React, { useEffect, useState } from "react";
import { SiConvertio } from "react-icons/si";
import { RiFileAddLine } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  instant_prediction,
  reset,
} from "../redux/slicers/prediction/predictionSlice";
import { toast } from "react-toastify";
const InstantPredictionBody = ({
  setSelectedImage,
  selectedImage,
  predictedImage,
  setPredictedImage,
  rawImage,
  setRawImage
}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const { request_name, isLoading, isError, isSuccess, message, data } =
    useSelector((state) => state.prediction);
  const animate_btn = (e) => {
    setIsHovered(true);
  };
  const stop_btn_animation = (e) => {
    setIsHovered(false);
  };
  useEffect(() => {
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

  const handleInstantPrediction = () => {
    if(rawImage === null){
        toast.error("Please input an image", {
          autoClose: 3000,
        });
        return
    }
    animate_btn();
    const formData = new FormData();
    formData.append("file", rawImage, rawImage.name);
    dispatch(instant_prediction(formData));
  };
  return (
    <div className="images_placeholder_container">
      <div className="placeholder">
        <div className="custom-file-input-container">
          <label
            htmlFor="fileInput"
            className={`file-label ${selectedImage ? "display-none" : ""}`}
          >
            <RiFileAddLine
              size={30}
              className={`file-icon ${selectedImage ? "display-none" : ""}`}
            />
            <p className={`${selectedImage ? "display-none" : ""}`}>
              Choose a file
            </p>
          </label>
          <form>
            <input
              type="file"
              id="fileInput"
              accept=".jpeg, .png, .jpg,.avif"
              className={`file-input ${selectedImage ? "display-none" : ""}`}
              onChange={handleImageChange}
            />
          </form>
          {selectedImage && <img src={selectedImage} alt="Selected" />}
        </div>
      </div>
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
        {predictedImage !== null && <img src={predictedImage} alt="Selected" />}
      </div>
    </div>
  );
};

export default InstantPredictionBody;
<img src="" alt="Selected"></img>;
