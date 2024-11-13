import React, { useState, useEffect } from "react";

const SubscriptionAdminPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Replace with actual data-fetching logic
    const fetchData = async () => {
      const data = [
        { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Standard", status: "Expired" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", plan: "Basic", status: "Active" },
      ];
      setSubscriptions(data);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleStatusToggle = (id) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.map((subscription) =>
        subscription.id === id
          ? { ...subscription, status: subscription.status === "Active" ? "Inactive" : "Active" }
          : subscription
      )
    );
  };

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name.toLowerCase().includes(filter.toLowerCase()) ||
      subscription.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Subscription Admin Panel</h1>

      {/* Search / Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name or email"
          value={filter}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Subscription Table */}
      <div className="overflow-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id} className="bg-gray-50 border-b hover:bg-gray-100">
                <td className="p-3">{subscription.name}</td>
                <td className="p-3">{subscription.email}</td>
                <td className="p-3">{subscription.plan}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 font-semibold rounded-full ${
                      subscription.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusToggle(subscription.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionAdminPage;
