import React from 'react';
import DeleteSubscription from './DeleteSubscription';

function Subscription() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Manage Subscriptions</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <DeleteSubscription />
      </div>
    </div>
  );
}

export default Subscription;