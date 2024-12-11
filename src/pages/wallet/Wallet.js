import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// Redux slice with async thunk for fetching wallet details
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: null,
    loading: false,
    error: null,
  },
  reducers: {
    setWallet(state, action) {
      state.wallet = action.payload;
    },
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
  },
});

export const { setWallet } = walletSlice.actions;

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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
    wallet: walletSlice.reducer,
  },
});

// Edit Wallet Page
function EditWallet() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wallet = useSelector((state) => state.wallet.wallet);

  useEffect(() => {
    if (!wallet) {
      dispatch(fetchWalletDetails());
    }
  }, [wallet, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API PUT request here to save wallet changes.
    alert('Wallet updated successfully!');
    navigate('/');
  };

  if (!wallet) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Wallet</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            defaultValue={wallet.name}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Credit</label>
          <input
            type="number"
            defaultValue={wallet.credit}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gift Card</label>
          <input
            type="number"
            defaultValue={wallet.giftcard}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

// Main Wallet Component
function Wallet() {
  const dispatch = useDispatch();
  const { wallet, loading, error } = useSelector((state) => state.wallet);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);

  const handleUpdateClick = () => {
    navigate(`/wallet/${wallet.id}/edit`);
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
      <div>
        <p><strong>Name:</strong> {wallet?.name}</p>
        <p><strong>Credit:</strong> {wallet?.credit}</p>
        <p><strong>Gift Card:</strong> {wallet?.giftcard}</p>
      </div>
      <div className="mt-4">
        <button onClick={handleUpdateClick} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Wallet
        </button>
      </div>
    </div>
  );
}

// App Component with Routes
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wallet />} />
        <Route path="/wallet/:id/edit" element={<EditWallet />} />
      </Routes>
    </Router>
  );
}

export default App;
export { store };
