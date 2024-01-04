import React from "react";
import { ToastContainer, cssTransition } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "react-toastify/dist/ReactToastify.minimal.css";

export default function Toast() {
  const transition = cssTransition({
    enter: "fade-in",
    exit: "fade-out",
  });
  return (
    <ToastContainer
      position='top-center'
      autoClose={1000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme='light'
      style={{ display: "flex", justifyContent: "center" }}
      closeButton={false}
      toastStyle={{ borderRadius: 0, border: "1px solid #ccc" }}
      transition={transition}
    />
  );
}
