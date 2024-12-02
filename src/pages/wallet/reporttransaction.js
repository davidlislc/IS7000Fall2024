import React, { useState } from "react";

const ReportTransactionCard = () => {
  const [formData, setFormData] = useState({
    transactionId: "",
    email: "",
    issue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Report Submitted:", formData);
    alert("Your report has been submitted successfully!");
    setFormData({ transactionId: "", email: "", issue: "" });
  };

  return (
    <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-300 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-yellow-800 mb-4">
        Report a Failed Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction ID */}
        <div>
          <label
            htmlFor="transactionId"
            className="block text-gray-700 font-medium mb-1"
          >
            Transaction ID
          </label>
          <input
            type="text"
            name="transactionId"
            id="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Enter Transaction ID"
          />
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Issue Description */}
        <div>
          <label
            htmlFor="issue"
            className="block text-gray-700 font-medium mb-1"
          >
            Describe the Issue
          </label>
          <textarea
            name="issue"
            id="issue"
            value={formData.issue}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-300"
            placeholder="Describe the issue with the transaction"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-medium py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportTransactionCard;
