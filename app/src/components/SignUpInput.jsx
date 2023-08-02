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
          />
          <div onClick={handleTogglePassword} className="eye_icon">
            {showPassword === true ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      ) : placeholder === "Birthday" ? (
        <input type="date" className="birthday" onChange={handleInputChange} />
      ) : placeholder === "Gender" ? (
        <div className="radio-container">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <label htmlFor="male" className="gender_label">
            Male
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <label htmlFor="female" className="gender_label">
            Female
          </label>
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          id={placeholder_id}
        />
      )}
    </div>
  );
};

export default SignUpInput;
