import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { notify } from "../Utils/Config";
// import { baseUrl } from "../Utils/Config";
let load = 0;
const instance = axios.create({
  baseURL: "http://3.218.8.102/api/",
});
instance.interceptors.request.use(
  (config) => {
    load++;
    document.body.classList.add("loading-indicator");

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTczMzk3NDQ2MywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzMzODg4MDYzfQ.Vtg3-TWalN9RyAnuJa6rDo9kNB_Cx8cycgBL-NFMt9Uncdo5zQjylmshXo-DYySc6BisnTQqbaVPLJ99v8Yp9A";
    let t1 = "Bearer " + token;
    // let t1 = token
    if (token) {
      config.headers["Authorization"] = t1;
    }
    // config.headers['Content-Type'] = 'application/json';
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    load--;
    if (load == 0) {
      document.body.classList.remove("loading-indicator");
    }
    
    const status = error.response ? error.response.status : null;
    switch (status) {
      case 400:
        console.error("Bad Request: ", error.response.data);
        notify(false,"Bad Request")
        break;
      case 401:
        console.error("Unauthorized: ", error.response.data); // Perform logout or redirect to login break;
        notify(false, "Unauthorized")
        break;
      case 403:
        console.error("Forbidden: ", error.response.data); // Handle forbidden error break;
        notify(false, "Forbidden")
        break;
      case 404:
        console.error("Not Found: ", error.response.data); // Handle not found error break;
        notify(false, "Not Found")
        break;
      case 500:
        console.error("Internal Server Error: ", error.response.data); // Handle server error break;
        notify(false, "Internal Server Error")
        break;
      case 502:
        console.error("Bad Gateway: ", error.response.data); // Handle bad gateway error break;
        notify(false, "Bad Gateway")
        break;
      case 503:
        console.error("Service Unavailable: ", error.response.data); // Handle service unavailable error break;
        notify(false, "Service Unavailable")
        break;
      default:
        console.error("Unhandled Error: ", error.response.data); // Handle other errors
        notify(false, "Unhandled Error")
        break;
    }
    // return Promise.reject(error);
  }
);
//Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    load--;
    if (load == 0) {
      document.body.classList.remove("loading-indicator");
    }
    return response;
  },
  (error) => {
    load--;
    if (load == 0) {
      document.body.classList.remove("loading-indicator");
    }
    const status = error.response ? error.response.status : null;
    switch (status) {
      case 400:
        console.error("Bad Request: ", error.response.data);
        notify(false,"Bad Request")
        break;
      case 401:
        console.error("Unauthorized: ", error.response.data); // Perform logout or redirect to login break;
        notify(false, "Unauthorized")
        break;
      case 403:
        console.error("Forbidden: ", error.response.data); // Handle forbidden error break;
        notify(false, "Forbidden")
        break;
      case 404:
        console.error("Not Found: ", error.response.data); // Handle not found error break;
        notify(false, "Not Found")
        break;
      case 500:
        console.error("Internal Server Error: ", error.response.data); // Handle server error break;
        notify(false, "Internal Server Error")
        break;
      case 502:
        console.error("Bad Gateway: ", error.response.data); // Handle bad gateway error break;
        notify(false, "Bad Gateway")
        break;
      case 503:
        console.error("Service Unavailable: ", error.response.data); // Handle service unavailable error break;
        notify(false, "Service Unavailable")
        break;
      default:
        console.error("Unhandled Error: ", error.response.data); // Handle other errors
        notify(false, "Unhandled Error")
        break;
    }
  }
);



export default instance
