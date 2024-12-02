import React, { useState } from "react";
import ReportTransactionCard from "./reporttransaction";

const Wallet = () => {
  // Simulated transactions data
  const transactions = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    description: `Transaction ${index + 1}`,
    amount: (Math.random() * 100).toFixed(2),
    status: Math.random() > 0.7 ? "Failed" : "Success",
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Pagination logic
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const currentTransactions = transactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  const failedTransactions = transactions.filter(
    (transaction) => transaction.status === "Failed"
  );

  // Pagination controls
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Wallet Transactions
        </h1>
      </div>

      {/* Transactions Section */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Transactions (Page {currentPage} of {totalPages})
        </h2>
        <div className="space-y-4">
          {currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 border rounded-lg ${
                transaction.status === "Failed"
                  ? "bg-red-50 border-red-300"
                  : "bg-green-50 border-green-300"
              }`}
            >
              <p className="text-gray-800 font-medium">
                {transaction.description}
              </p>
              <p className="text-gray-600">
                Amount: <span className="font-bold">${transaction.amount}</span>
              </p>
              <p
                className={`font-bold ${
                  transaction.status === "Failed"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                Status: {transaction.status}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Failed Transactions Section */}
      <div className="max-w-7xl mx-auto bg-red-50 border border-red-300 rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Failed Transactions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {failedTransactions.slice(0, 9).map((transaction) => (
            <div key={transaction.id} className="p-4 bg-white rounded-lg shadow">
              <p className="text-gray-800 font-medium">
                {transaction.description}
              </p>
              <p className="text-gray-600">
                Amount: <span className="font-bold">${transaction.amount}</span>
              </p>
              <p className="text-red-600 font-bold">Status: {transaction.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Failed Transactions */}
      <div className="p-4">
      < ReportTransactionCard />
      </div>
    </div>
  );
};

export default Wallet;
