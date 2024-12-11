import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Redux slice with async thunk for fetching wallet details
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(fetchWalletDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Async thunk for fetching wallet details
export const fetchWalletDetails = createAsyncThunk(
  'wallet/fetchDetails',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://3.218.8.102/api/wallets/1', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Store configuration
const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer
  }
});

// Main Wallet component
function Wallet() {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector(state => state.wallet);
  const [isEditing, setIsEditing] = useState(false);
  const [showGiftCards, setShowGiftCards] = useState(false);
  const [viewingGiftCardId, setViewingGiftCardId] = useState(null);
  const [isAddingGiftCard, setIsAddingGiftCard] = useState(false);

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsAddingGiftCard(false);
    dispatch(fetchWalletDetails()); // Refresh wallet details after saving
  };

  const handleGiftCardClick = () => {
    setShowGiftCards(true);
  };

  const handleAddGiftCardClick = () => {
    setIsAddingGiftCard(true);
    setIsEditing(true);
  };

  const handleViewGiftCard = (id) => {
    setViewingGiftCardId(id);
  };

  const handleBack = () => {
    setViewingGiftCardId(null);
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
        <div>
          {/* Place your EditWallet component logic here */}
          <p>Edit Wallet Form</p>
          <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      ) : (
        <div>
          {/* Place your WalletDetails component logic here */}
          <p>Wallet Details</p>
        </div>
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
      </div>

      {showGiftCards && !viewingGiftCardId && (
        <div>
          {/* Place your GiftCardList component logic here */}
          <p>Gift Card List</p>
        </div>
      )}

      {viewingGiftCardId && (
        <div>
          {/* Place your GiftCardDetails component logic here */}
          <p>Gift Card Details</p>
          <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default Wallet;
export { store };
