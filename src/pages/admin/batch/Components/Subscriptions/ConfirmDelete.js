import React, { useState } from "react";
import { deleteRecord } from "../../Utils/API";
import { urls } from "../../Utils/Config";

const ConfirmDelete = ({ updatingData, close, closeAndUpdate }) => {
  const submit = async (r) => {
    let res = await deleteRecord(`${urls.subscriptions}/${updatingData?.id}`);
    if (res?.status) closeAndUpdate()
  };
  const subscriptionKeys = [
    { name: "Name", key: "name" },
    { name: "Subscription date", key: "subdate" },
    { name: "Status", key: "status" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className=" text-xl font-bold bg-themeColor text-white p-3">Delete Subscription</div>
      <div className="p-2 flex flex-wrap">
        <div className="flex flex-col">
          <div className="font-bold text-lg">Are you sure want to delete the below record?</div>
          <div className="flex">
            {subscriptionKeys?.map((e, i) => (
              <div className="flex">
                <div className="p-2">
                  <span className="font-semibold">{e?.name} :</span> {updatingData?.[e?.key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-2 gap-2">
        <button onClick={close} className="cancelbtn">
          Close
        </button>
        <button onClick={submit} className="savebtn">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
