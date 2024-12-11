import Swal from "sweetalert2";
import {  toast, Zoom } from "react-toastify";

export const baseUrl = "http://3.218.8.102/api/";

export const urls = {
  login: "authenticate",
  userInfo: "account",
  subscriptions: "subscriptions",
};

export const logOutFunction = () => (localStorage.clear(), (window.location.pathname = "/"));

export const notify = (status, msg) => {
  const toastOptions = {
    position: "top-right", // Set the position to bottom-right
    autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
    hideProgressBar: false, // Show the progress bar
    closeOnClick: true, // Close the toast when clicked
    pauseOnHover: true, // Pause the timer when hovering
    draggable: true, // Make the toast draggable
    progress: undefined, // Use the default progress bar
    // transition: Flip,
    theme: "dark",
    transition: Zoom,
    style: {
      width: "300px", // Adjust width as needed
    },
  };
  if (status == true) toast.success(msg, toastOptions);
  else toast.error(msg, toastOptions);
};

export const dilogueBox = (text, onClickFn, html) => {
  Swal.fire({
    title: text,
    html: html,
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      onClickFn();
    }
  });
};

