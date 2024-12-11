import React, { useEffect } from "react";

const ViewSubscription = ({ updatingData, close }) => {
  const subscriptionKeys = [
    { name: "Name", key: "name" },
    { name: "Subscription date", key: "subdate" },
    { name: "Status", key: "status" },
  ];
  const userKeys = [
    { name: "First name", key: "firstName" },
    { name: "Last name", key: "lastName" },
    { name: "Email", key: "email" },
  ];
  const serviceKeys = [
    { name: "Name", key: "name" },
    { name: "Level", key: "level" },
    { name: "Interval", key: "interval" },
    { name: "Price", key: "price" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {updatingData && Object?.keys(updatingData)?.length > 0 && (
        <>
          <div className=" text-xl font-bold bg-themeColor text-white p-3">View Subscription details</div>
          <div className="p-2">
            <div className="flex flex-col">
              <div className="font-bold text-lg">Subscription Details</div>
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
            {updatingData?.user && Object?.keys(updatingData?.user)?.length > 0 && (
              <div className="flex flex-col">
                <div className="font-bold text-lg">User Details</div>
                <div className="flex">
                  {userKeys?.map((e, i) => (
                    <div className="flex">
                      <div className="p-2">
                        <span className="font-semibold">{e?.name} :</span> {updatingData?.user?.[e?.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {updatingData?.service && Object?.keys(updatingData?.service)?.length > 0 && (
              <div className="flex flex-col">
                <div className="font-bold text-lg">Service Details</div>
                <div className="flex">
                  {serviceKeys?.map((e, i) => (
                    <div className="flex">
                      <div className="p-2">
                        <span className="font-semibold">{e?.name} :</span> {updatingData?.service?.[e?.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end p-2 gap-2">
            <button onClick={close} className="cancelbtn">
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewSubscription;
