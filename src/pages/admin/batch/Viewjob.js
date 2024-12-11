import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { apiUrl } from './Api';
import { setAuthToken } from './AuthToken';


const ViewJob = () => {
  const { id } = useParams(); // Get the batch ID from the URL
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation hook

  // API URL to fetch details of a single batch by its ID
  const apiUrl = http ://3.218.8.102/api/batches/${id};
  const bearerToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzMzOTU3MTM1LCJhdXRoIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzMzODcwNzM1fQ.L11fvz9x8U29D1AGpFpqwzx2-X3QFQnisR0WNP81NHBAUtERpp0lIcM09XmICLAqmd__YubntS_CgCwSt2KpxQ';


  // Function to fetch data for the specific batch
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

  // Fetch the batch data when the component mounts or when the id changes
  useEffect(() => {
    fetchBatchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Batch Details</h1>

      {batch ? (
        <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
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
        </div>
      ) : (
        <p>No data found</p>
      )}

      <div className="mt-4">
        <button
          onClick={() => navigate('/batch')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          Back
        </button>

        <button
          onClick={() => navigate(/edit-batch/${batch.id})} // Assuming this is the edit URL path
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaEdit className="mr-2" /> Edit Batch
        </button>
      </div>
    </div>
  );
};
  
export default ViewJob;