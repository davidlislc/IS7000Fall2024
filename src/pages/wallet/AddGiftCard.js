import React, { useState } from 'react';
import axios from 'axios';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Async thunk for adding/updating a gift card
const saveGiftCard = createAsyncThunk(
  'giftCard/save',
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://3.218.8.102/api/wallets/1`, payload, {
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

// Redux slice for managing the gift card state
const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState: {
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveGiftCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveGiftCard.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveGiftCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Configure the Redux store
const store = configureStore({
  reducer: {
    giftCard: giftCardSlice.reducer
  }
});

// AddGiftCard component
function AddGiftCard({ onSave }) {
  const [name, setName] = useState('');
  const [credit, setCredit] = useState(0);
  const [giftcard, setGiftcard] = useState(0);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.giftCard);

  const handleSave = async () => {
    const payload = {
      id: 1,  // Assuming a placeholder ID; replace as needed
      name,
      credit,
      giftcard,
      user: {
        id: 2,  // Placeholder user ID; adjust as necessary
        login: 'user'
      }
    };

    await dispatch(saveGiftCard(payload));
    if (!error) {
      onSave();
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

// Main App component wrapped with the Redux Provider
function App() {
  const handleSave = () => {
    console.log('Gift card saved');
  };

  return (
    <Provider store={store}>
      <AddGiftCard onSave={handleSave} />
    </Provider>
  );
}

export default App;
