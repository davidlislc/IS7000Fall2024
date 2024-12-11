import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WalletDetails() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://3.218.8.102/api/wallets/1', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch wallet details');
        }

        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Wallet Details</h2>
      <p><strong>Name:</strong> {wallet.name}</p>
      <p><strong>Credit:</strong> {wallet.credit}</p>
      <p><strong>Gift Card Balance:</strong> {wallet.giftcard}</p>
      <p><strong>Last Updated:</strong> {wallet.lastModifiedDate || 'N/A'}</p>
    </div>
  );
}

export default WalletDetails;
