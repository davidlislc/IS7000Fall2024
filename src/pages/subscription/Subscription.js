import React from 'react';

function Subscription() {
  // Dummy data for top 10 subscriptions
  const subscriptions = [
    { id: 1, name: 'Basic Plan', description: 'Access to standard features', price: '$5/month' },
    { id: 2, name: 'Pro Plan', description: 'Includes premium features', price: '$15/month' },
    { id: 3, name: 'Enterprise Plan', description: 'Best for large teams', price: '$30/month' },
    { id: 4, name: 'Family Plan', description: 'Access for up to 5 users', price: '$12/month' },
    { id: 5, name: 'Student Plan', description: 'Discounted rate for students', price: '$3/month' },
    { id: 6, name: 'Corporate Plan', description: 'For corporate usage', price: '$40/month' },
    { id: 7, name: 'Freelancer Plan', description: 'Ideal for individuals', price: '$8/month' },
    { id: 8, name: 'Trial Plan', description: '30-day free trial', price: '$0/month' },
    { id: 9, name: 'Annual Plan', description: 'Pay annually and save', price: '$50/year' },
    { id: 10, name: 'VIP Plan', description: 'All access VIP pass', price: '$100/month' },
  ];

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Top 10 Subscriptions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700">{sub.name}</h3>
            <p className="text-gray-500 mt-2">{sub.description}</p>
            <p className="text-teal-700 font-semibold mt-4">{sub.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscription;
