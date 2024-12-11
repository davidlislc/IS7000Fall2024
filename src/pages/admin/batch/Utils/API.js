import instance from "../axiosServices";
import { notify, urls } from "./Config";

export const loginApi = async (data) => {
    try {
      let res = await instance.post(urls?.login, data);
      if (res?.status == 200) {
        notify(true, "User logged in successfully");
        return res?.data;
      }
      return {};
    } catch (e) {
      console.log("Error", e);
      return {};
    }
  };
  
  export const saveRecord = async (url, data) => {
    try {
      let res = await instance.post(url, data);
      if (res?.status == 200 || res?.status == 201) notify(true, "Record created Successfully");
      return { status: true };
    } catch (e) {
      console.log("Error", e);
      return { status: false };
    }
  };
  
  export const updateRecord = async (url, data) => {
    try {
      let res = await instance.put(url, data);
      if (res?.status == 200 || res?.status == 201) notify(true, "Record updated Successfully");
      return { status: true };
    } catch (e) {
      console.log("Error", e);
      return { status: false };
    }
  };
  
  export const getList = async (url) => {
    try {
      let res = await instance.get(url);
      if (res?.status == 200) return Array.isArray(res?.data) && res?.data?.length > 0 ? res?.data : [];
    } catch (e) {
      console.log("Error", e);
      return [];
    }
  };
  
  export const getObject = async (url) => {
    try {
      let res = await instance.get(url);
      if (res?.status == 200) return Object.keys(res?.data)?.length > 0 ? res?.data : {};
    } catch (e) {
      console.log("Error", e);
      return {};
    }
  };
  
  export const deleteRecord = async (url) => {
    try {
      let res = await instance.delete(url);
      if (res?.status == 200 || res?.status == 204) notify(true, "Record deleted successfully");
      return { status: true };
    } catch (e) {
      console.log("Error", e);
      return { status: false };
    }
  };
  