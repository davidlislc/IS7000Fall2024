import React, { useState } from 'react';

const SubscriptionAdmin = () => {
  // State to hold form values
  const [subscription, setSubscription] = useState({
    name: '',
    price: '',
    duration: '',
    features: [''],
  });

  // State to hold list of subscriptions
  const [subscriptions, setSubscriptions] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscription({ ...subscription, [name]: value });
  };

  // Handle dynamic features input
  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...subscription.features];
    updatedFeatures[index] = value;
    setSubscription({ ...subscription, features: updatedFeatures });
  };

  // Add a new feature input
  const addFeature = () => {
    setSubscription({ ...subscription, features: [...subscription.features, ''] });
  };

  // Remove a feature input
  const removeFeature = (index) => {
    const updatedFeatures = subscription.features.filter((_, i) => i !== index);
    setSubscription({ ...subscription, features: updatedFeatures });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscriptions([...subscriptions, subscription]);
    setSubscription({ name: '', price: '', duration: '', features: [''] });
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Subscription</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subscription Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={subscription.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Subscription Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={subscription.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Subscription Duration */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Duration (in months)</label>
          <input
            type="number"
            name="duration"
            value={subscription.duration}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Dynamic Features */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Features</label>
          {subscription.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 text-blue-500 hover:text-blue-700 font-semibold"
          >
            + Add Feature
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Subscription
        </button>
      </form>

      {/* List of Added Subscriptions */}
      {subscriptions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Subscriptions</h3>
          <ul className="space-y-4">
            {subscriptions.map((sub, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-md">
                <h4 className="font-bold text-lg">{sub.name}</h4>
                <p>Price: ${sub.price}</p>
                <p>Duration: {sub.duration} months</p>
                <p>Features:</p>
                <ul className="list-disc ml-6">
                  {sub.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubscriptionAdmin;
