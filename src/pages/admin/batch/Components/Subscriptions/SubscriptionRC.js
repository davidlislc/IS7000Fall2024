import React, { lazy } from "react";
import { Route, Routes } from "react-router";
import AllSubscriptions from "./AllSubscriptions";
import AddSubscription from "./AddSubscription";


const SubscriptionRC = () => {
  return (
    <Routes>
    <Route path="all-subscriptions" element={<AllSubscriptions />} />
    <Route path="add-subscription" element={<AddSubscription />} />
  </Routes>
    
  );
};

export default SubscriptionRC;
