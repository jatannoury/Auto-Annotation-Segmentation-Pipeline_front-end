import React from "react";
import "../styles/modal.css";
import "../styles/signUp.css";

const Modal = ({ show, children, extra_classname }) => {
  const showHideClassName = show
    ? "modal display-block signup_container"
    : "modal display-none signup_container";
  return (
    <div className={showHideClassName}>
      <section className={`modal-main ${extra_classname}`}>{children}</section>
    </div>
  );
};

export default Modal;
