import React, { useState } from 'react'

function DeleteSubscription() {
  const initialSubscriptions = [
    { id: '1', name: 'Premium Plan', price: '$15/month' },
    { id: '2', name: 'Standard Plan', price: '$10/month' },
    { id: '3', name: 'Basic Plan', price: '$5/month' },
    { id: '4', name: 'Family Plan', price: '$25/month' },
    { id: '5', name: 'Student Plan', price: '$3/month' },
  ];

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this subscription?");
    if (isConfirmed) {
      const updatedSubscriptions = subscriptions.filter(subscription => subscription.id !== id);
      setSubscriptions(updatedSubscriptions);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {subscriptions.length > 0 ? (
        <div className="w-full max-w-2xl space-y-4">
          {subscriptions.map(subscription => (
            <div
              key={subscription.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{subscription.name}</h2>
                <p className="text-gray-600">{subscription.price}</p>
              </div>
              <button
                onClick={() => handleDelete(subscription.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md font-semibold"
              >
                Cancel Subscription
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">You have no subscriptions to delete.</p>
      )}
    </div>
  );
}

export default DeleteSubscription