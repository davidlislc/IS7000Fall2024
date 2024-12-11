import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WalletDetails from './WalletDetails';
import EditWallet from './EditWallet';
import GiftCardList from './GiftCardList';
import GiftCardDetails from './GiftCardDetails';
import AddGiftCard from './AddGiftCard';

function Wallet() {
  const [isEditing, setIsEditing] = useState(false);
  const [showGiftCards, setShowGiftCards] = useState(false);
  const [viewingGiftCardId, setViewingGiftCardId] = useState(null);
  const [isAddingGiftCard, setIsAddingGiftCard] = useState(false);
  const [walletData, setWalletData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateAndFetchDetails = async () => {
      setLoading(true);
      try {
        const token = await authenticate();
        setToken(token);
        if (token) {
          await fetchWalletDetails(token);
        }
      } catch (error) {
        console.error('Error during authentication and fetching details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    authenticateAndFetchDetails();
  }, []);

  const authenticate = async () => {
    try {
      const response = await axios.post('http://3.218.8.102/api/authenticate', {
        username: 'user',
        password: 'user',
        rememberMe: false
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = response.data.id_token;
      console.log('Token:', token); // Log the token
      localStorage.setItem('token', token); // Store the token in localStorage
      return token; // Return the token
    } catch (error) {
      console.error('Error authenticating:', error);
      throw new Error('Authentication failed');
    }
  };

  const fetchWalletDetails = async (token) => {
    try {
      const response = await axios.get('http://3.218.8.102/api/wallets/1', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status); // Log the response status
      console.log('Wallet data:', response.data); // Log the wallet data
      setWalletData(response.data);
    } catch (error) {
      console.error('Error fetching wallet details:', error);
      throw new Error('Fetching wallet details failed');
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    setIsEditing(false);
    setIsAddingGiftCard(false);
    if (token) {
      await fetchWalletDetails(token); // Refresh wallet details after saving
    }
  };

  const handleGiftCardClick = () => setShowGiftCards(true);

  const handleAddGiftCardClick = () => setIsAddingGiftCard(true);

  const handleViewGiftCard = (id) => setViewingGiftCardId(id);

  const handleBack = () => setViewingGiftCardId(null);

  const handleUpdateClick = () => {
    window.location.href = 'http://3.218.8.102/wallet/1/edit';
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Wallet</h1>

      {isEditing ? (
        <EditWallet onSave={handleSaveClick} isAddingGiftCard={isAddingGiftCard} walletData={walletData} />
      ) : isAddingGiftCard ? (
        <AddGiftCard onSave={handleSaveClick} walletData={walletData} />
      ) : (
        <WalletDetails walletData={walletData} />
      )}

      <div className="mt-4">
        <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Wallet Info
        </button>
        <button onClick={handleGiftCardClick} className="bg-green-500 text-white px-4 py-2 rounded ml-4">
          List Gift Cards
        </button>
        <button onClick={handleAddGiftCardClick} className="bg-yellow-500 text-white px-4 py-2 rounded ml-4">
          Add Gift Card
        </button>
        <button onClick={handleUpdateClick} className="bg-purple-500 text-white px-4 py-2 rounded ml-4">
          Update Wallet
        </button>
      </div>

      {showGiftCards && !viewingGiftCardId && (
        <GiftCardList onViewGiftCard={handleViewGiftCard} />
      )}

      {viewingGiftCardId && (
        <GiftCardDetails giftCardId={viewingGiftCardId} onBack={handleBack} />
      )}
    </div>
  );
}

export default Wallet;
