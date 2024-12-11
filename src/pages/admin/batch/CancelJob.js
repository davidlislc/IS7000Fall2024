import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from './Api';
import { setAuthToken } from './AuthToken';

const DeleteJob = () => {
  const { id } = useParams(); // Get the batch ID from the URL
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation hook

  const apiUrl = http://3.218.8.102/api/batches/${id};
  const bearerToken = setAuthToken  // Function to fetch batch data before deletion
  const fetchBatchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: Bearer ${bearerToken},
        },
      });
      setBatch(response.data); // Set the batch data
    } catch (err) {
      setError(err.message); // Set any error message
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Fetch the batch data when the component mounts
  useEffect(() => {
    fetchBatchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(apiUrl, {
        headers: {
          Authorization: Bearer ${bearerToken},
        },
      });
      navigate('/batch'); // Navigate to batch list after successful deletion
    } catch (err) {
      setError(err.message); // Set any error message
    }
  };

  const handleCancel = () => {
    navigate('/batch'); // Navigate back to the batch list if cancel is clicked
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Delete Batch</h1>

      {batch ? (
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this batch?</h2>

          <table className="table-auto w-full text-left">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Job</th>
                <th className="px-4 py-2">Run Date</th>
                <th className="px-4 py-2">Batch Status</th>
                <th className="px-4 py-2">User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-600">
                <td className="px-4 py-2">{batch.id}</td>
                <td className="px-4 py-2">{batch.name}</td>
                <td className="px-4 py-2">{batch.job}</td>
                <td className="px-4 py-2">{batch.rundate}</td>
                <td className="px-4 py-2">{batch.batchstatus}</td>
                <td className="px-4 py-2">
                  {batch.user ? batch.user.login : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4"
            >
              Confirm Delete
            </button>

            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default DeleteJob;