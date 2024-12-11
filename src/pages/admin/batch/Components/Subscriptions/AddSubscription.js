import React, { useState } from "react";
import {  urls } from "../../Utils/Config";
import { saveRecord, updateRecord } from "../../Utils/API";

const AddSubscription = ({ updatingData, close, closeAndUpdate }) => {
  const [data, setData] = useState(updatingData);
  const changeData = () => (e) => setData((p) => ({ ...p, [e?.target?.name]: e?.target?.value }));
  const submit = async () => {
    let res;
    if (data?.id > 0)
      res = await updateRecord(`${urls.subscriptions}/${data?.id}`, data);
    else
      res = await saveRecord(urls.subscriptions, { ...data, user: JSON.parse(localStorage.getItem("user") || "{}") });
    if (res?.status) closeAndUpdate();
  };
  return (
    <div className="flex flex-col gap-3">
      <div className=" text-xl font-bold bg-themeColor text-white p-3">Add Subscription</div>
      <div className="p-2 flex flex-wrap">
        <div className="form-floating col-md-6 col-6 mb-2 p-1">
          <input
            type="text"
            required
            value={data?.["name"]}
            onChange={changeData()}
            name="name"
            className={`form-control`}
            id="floatingInput"
          />
          <label for="floatingInput">
            Subscription Name<span className="text-danger">*</span>
          </label>
        </div>
        <div className="form-floating col-md-6 col-6 mb-2 p-1">
          <input
            type="Date"
            value={data?.["subdate"]}
            onChange={changeData()}
            name="subdate"
            className={`form-control`}
            id="floatingInput"
          />
          <label for="floatingInput">
            Subscription Date<span className="text-danger">*</span>
          </label>
        </div>
        <div className="form-floating col-md-6 col-6 mb-2 p-1">
          <input
            type="text"
            required
            value={data?.["status"]}
            onChange={changeData()}
            name="status"
            className={`form-control`}
            id="floatingInput"
          />
          <label for="floatingInput">
            Status <span className="text-danger">*</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end p-2 gap-2">
        <button onClick={close} className="cancelbtn">
          Close
        </button>
        <button onClick={submit} className="savebtn">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddSubscription;
