import React, { useState } from 'react';
import axios from 'axios';

function AddGiftCard({ onSave, walletData }) {
  const [name, setName] = useState(walletData ? walletData.name : '');
  const [credit, setCredit] = useState(walletData ? walletData.credit : 0);
  const [giftcard, setGiftcard] = useState(0); // Initialize with 0 for adding a new gift card
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    const payload = {
      id: walletData.id,
      name,
      credit,
      giftcard,
      user: {
        id: walletData.user.id,
        login: walletData.user.login
      }
    };

    try {
      const response = await axios.put(http://3.218.8.102/api/wallets/${walletData.id}, payload, {
        headers: {
          'Authorization': Bearer ${token},
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      onSave();
    } catch (error) {
      console.error('Error saving wallet:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Gift Card</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Credit</label>
        <input
          type="number"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Gift Card Balance</label>
        <input
          type="number"
          value={giftcard}
          onChange={(e) => setGiftcard(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}

export default AddGiftCard;
