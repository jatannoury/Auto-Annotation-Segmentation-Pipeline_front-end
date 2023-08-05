import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useState } from "react";

const SignUpInput = ({ placeholder, setFormData, formData, signIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  let placeholder_id = placeholder.replace(" ", "");
  placeholder_id =
    placeholder_id.charAt(0).toLowerCase() + placeholder_id.slice(1);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [placeholder_id]: e.target.value.toString(),
    }));
  };
  const handleContainerClick = (e) => {
    if (e.target.className === "eye_icon") {
      return;
    }
    const eyeIconElement = document.querySelector(".eye_icon");
    eyeIconElement.style.borderColor = "#c9c9c9";
  };
  const handleContainerBlur = () => {
    const eyeIconElement = document.querySelector(".eye_icon");
    if (eyeIconElement) {
      // Change the border color of the eye_icon class here.
      // For example, setting it to red:
      eyeIconElement.style.borderColor = "#705cc9";
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`input_component ${signIn === true ? " sign_in" : ""}`}>
      <label htmlFor={placeholder_id}>{placeholder}</label>
      {placeholder === "Password" ? (
        <div className="password_container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            onChange={handleInputChange}
            id={placeholder_id}
            className="password_input"
            onClick={handleContainerClick}
            onBlur={handleContainerBlur}
          />
          <div onClick={handleTogglePassword} className="eye_icon">
            {showPassword === true ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      ) : placeholder === "Birthday" ? (
        <div className="input_container">
          <input
            type="date"
            className="birthday"
            onChange={handleInputChange}
          />
        </div>
      ) : placeholder === "Gender" ||
        placeholder === "Protect" ||
        placeholder === "Storage Type" ? (
        <div className="radio_container">
          <div className="label_radio_conatiner">
            <input
              type="radio"
              id="male"
              name={
                placeholder === "Gender"
                  ? "gender"
                  : placeholder === "Storage Type"
                  ? "upper"
                  : "lower"
              }
              value={
                placeholder === "Gender"
                  ? "Male"
                  : placeholder === "Storage Type"
                  ? "Cloud"
                  : "Yes"
              }
              onChange={handleInputChange}
              className="custom-radio"
            />
            <label htmlFor="male" className="gender_label">
              <p className="gender_p_tag">
                {placeholder === "Gender"
                  ? "Male"
                  : placeholder === "Storage Type"
                  ? "Cloud"
                  : "Yes"}
              </p>
            </label>
          </div>
          <div className="label_radio_conatiner">
            <input
              type="radio"
              id="female"
              name={
                placeholder === "Gender"
                  ? "gender"
                  : placeholder === "Storage Type"
                  ? "upper"
                  : "lower"
              }
              value={
                placeholder === "Gender"
                  ? "Female"
                  : placeholder === "Storage Type"
                  ? "Local"
                  : "No"
              }
              onChange={handleInputChange}
              className="custom-radio"
            />
            <label htmlFor="female" className="gender_label">
              <p className="gender_p_tag">
                {placeholder === "Gender"
                  ? "Female"
                  : placeholder === "Storage Type"
                  ? "Local"
                  : "No"}
              </p>
            </label>
          </div>
        </div>
      ) : (
        <div className="input_container">
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            id={placeholder_id}
          />
        </div>
      )}
    </div>
  );
};

export default SignUpInput;
