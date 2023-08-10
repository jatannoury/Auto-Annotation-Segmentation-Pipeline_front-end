import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import { MdOutlineClose } from "react-icons/md";
import { GoDownload } from "react-icons/go";
import { BsFiles, BsFileEarmark } from "react-icons/bs";
import JSZip from "jszip";

import { saveAs } from "file-saver";

import "../styles/instant_prediction.css";
import HomeLeftContainer from "../components/HomeLeftContainer";
import InstantPredictionHeader from "../components/InstantPredictionHeader";
import InstantPredictionBody from "../components/InstantPredictionBody";
import InstantPredictionRadioBtns from "../components/InstantPredictionRadioBtns";
import { toast } from "react-toastify";
const InstantPrediction = () => {
  const [burgerMenuClicked, setBurgerMenuClicked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDir, setSelectedDir] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [inputType, setInputType] = useState("single");
  const [predictedImages, setPredictedImages] = useState(null);
  const [predictedImagesCounter, setPredictedImagesCounter] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [downloadType, setDownloadType] = useState(`${inputType} - O`);

  const burger_menu_handler = () => {
    setBurgerMenuClicked(!burgerMenuClicked);
  };
  const handleDownloadBtnHover = (event) => {
    const rect = event.target.getBoundingClientRect();
    const { clientX, clientY } = event;
    const { left, top, width, height } = rect;
    const x = clientX - left;
    const y = clientY - top;

    const xDistance = Math.abs(x - width / 2);
    const yDistance = Math.abs(y - height / 2);

    let direction;
    if (xDistance > yDistance) {
      direction = x > width / 2 ? "right" : "left";
    } else {
      direction = y > height / 2 ? "bottom" : "top";
    }
    if (direction !== "left") {
      handleHideDropDown();
    }
  };
  const handleNextImage = (e) => {
    if (predictedImagesCounter === predictedImages.length - 1) {
      return;
    }
    setPredictedImagesCounter(predictedImagesCounter + 1);
  };
  const handleChangeDownloadType = (e) => {
    handleHideDropDown();
    if (e.target.className === "download_options top_option") {
      setDownloadType(`${inputType} - IO`);
    }
    if (e.target.className === "download_options bottom_option") {
      setDownloadType(`${inputType} - O`);
    }
  };
  const handleShowDropDown = () => {
    setShowDropDown(true);
  };

  const handleHideDropDown = () => {
    setShowDropDown(false);
  };

  const handlePrevImage = (e) => {
    if (predictedImagesCounter === 0) {
      return;
    }
    setPredictedImagesCounter(predictedImagesCounter - 1);
  };
  const close_input_image = () => {
    setSelectedImage(null);
    setRawImage(null);
    setPredictedImage(null);
    setSelectedDir(null);
    setPredictedImages(null);
    document.getElementById("fileInput").value = "";
    setPredictedImagesCounter(0);
  };
  const close_output_image = () => {
    setPredictedImage(null);
  };
  const downloadPrediction = async () => {
    if (inputType === "single") {
      if (rawImage === null) {
        toast.error("Please input an image", {
          autoClose: 3000,
        });
        return;
      }
      if (downloadType.includes("- O") && inputType === "single") {
        saveAs(predictedImage, "image.jpg");
      }
      if (downloadType.includes("- IO") && inputType === "single") {
        const zip = new JSZip();

        const file1Name = "selected_image.jpg";
        const file2Name = "predicted_image.jpg";

        const file1Data = atob(
          selectedImage.replace("data:image/jpeg;base64,", "")
        );
        const file2Data = atob(
          predictedImage.replace("data:image/jpeg;base64,", "")
        );

        zip.file(file1Name, file1Data, { binary: true });
        zip.file(file2Name, file2Data, { binary: true });

        const zipBlob = await zip.generateAsync({ type: "blob" });

        saveAs(zipBlob, "random_files.zip");
      }
    }
    if (inputType === "batch") {
      if (downloadType.includes("- O") && inputType === "batch") {
        const zip = new JSZip();

        predictedImages.map(async (predicted_img, index) => {
          const fileName = `predicted_image_${index}.jpg`;
          const fileData = atob(
            predicted_img.replace("data:image/jpeg;base64,", "")
          );
          zip.file(fileName, fileData, { binary: true });
        });
        await zip.generateAsync({ type: "blob" }).then((res) => {
          saveAs(res, `${downloadType.replace(" - O", "_Output_Only")}.zip`);
        });
      }
      if (downloadType.includes("- IO") && inputType === "batch") {
        const zip = new JSZip();
        let encoded_data = [];

        const readFileAsync = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        };

        const processData = async () => {
          for (const element of Object.keys(selectedDir.data)) {
            try {
              const data = await readFileAsync(selectedDir.data[element]);
              encoded_data.push(data);
            } catch (error) {
              console.error("Error reading file:", error);
            }
          }

          // Use Promise.all to wait for all promises to resolve
          await Promise.all(
            predictedImages.map(async (predicted_img, index) => {
              try {
                const predictedFileName = `predicted_image_${index}.jpg`;
                const selectedFileName = `selected_image_${index}.jpg`;
                const predictedFileData = atob(
                  predicted_img.split("base64,")[1]
                );
                const selectedFileData = atob(
                  encoded_data[index].split("base64,")[1]
                );
                zip.file(predictedFileName, predictedFileData, {
                  binary: true,
                });
                zip.file(selectedFileName, selectedFileData, { binary: true });
              } catch (e) {
                console.error("Error adding files to zip:", e);
              }
            })
          );

          await zip.generateAsync({ type: "blob" }).then((res) => {
            saveAs(res, `${downloadType}.zip`);
          });
        };

        processData();
      }
    }
  };
  return (
    <div className="main_container">
      {burgerMenuClicked === true ? (
        <HomeLeftContainer
          burger_menu_handler={burger_menu_handler}
          burgerMenuClicked={burgerMenuClicked}
        />
      ) : (
        <></>
      )}
      <div className="right_main_container">
        <div className="right_container">
          {burgerMenuClicked === false ? (
            <RxHamburgerMenu
              size={30}
              onClick={burger_menu_handler}
              className="burger_menu_right_container"
            />
          ) : (
            <div className="burger_menu_placeholder"></div>
          )}
          <InstantPredictionHeader close_input_image={close_input_image} />
          <div className="buttons_main_container">
            <div className="buttons">
              <div className="button_container">
                <div className="input_type">
                  <div className="input_buttons">
                    <InstantPredictionRadioBtns
                      inputType={inputType}
                      setInputType={setInputType}
                      close_input_image={close_input_image}
                    />
                  </div>
                </div>
                <div>
                  <MdOutlineClose
                    size={20}
                    className="button"
                    onClick={close_input_image}
                  />
                </div>
              </div>
              <div className="button_container">
                <div className="download_type">
                  {downloadType.includes("O") &&
                  downloadType.includes("IO") === false ? (
                    <BsFileEarmark size={20} />
                  ) : (
                    downloadType.includes("IO") && <BsFiles size={20} />
                  )}
                </div>
                <div className="right_left_container">
                  {showDropDown === true && (
                    <div className="options_container">
                      <div
                        className="last_option_container"
                        onMouseLeave={handleHideDropDown}
                      >
                        <div
                          className="download_options top_option"
                          onClick={handleChangeDownloadType}
                        >
                          Input/Output
                        </div>
                        <div
                          className="download_options bottom_option"
                          onClick={handleChangeDownloadType}
                        >
                          Only Output
                        </div>
                      </div>
                    </div>
                  )}
                  <GoDownload
                    size={20}
                    className="button download_button"
                    onClick={downloadPrediction}
                    onMouseEnter={handleShowDropDown}
                    onMouseLeave={handleDownloadBtnHover}
                  />
                </div>
                <div className="right_buttons">
                  <MdOutlineClose
                    size={20}
                    className="button"
                    onClick={close_output_image}
                  />
                </div>
              </div>
            </div>
          </div>
          <InstantPredictionBody
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            predictedImage={predictedImage}
            setPredictedImage={setPredictedImage}
            rawImage={rawImage}
            setRawImage={setRawImage}
            inputType={inputType}
            setInputType={setInputType}
            selectedDir={selectedDir}
            setSelectedDir={setSelectedDir}
            close_input_image={close_input_image}
            setPredictedImages={setPredictedImages}
            predictedImages={predictedImages}
            predictedImagesCounter={predictedImagesCounter}
          />

          {predictedImages && (
            <div className="next_btn_root_container">
              <div className="next_button_main_container">
                <div className="btns_container">
                  {predictedImagesCounter > 0 ? (
                    <div className="next_btn" onClick={handlePrevImage}>
                      <BsArrowLeft size={40} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {predictedImagesCounter < predictedImages.length - 1 ? (
                    <div className="next_btn" onClick={handleNextImage}>
                      <BsArrowRight size={40} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstantPrediction;
