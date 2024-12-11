// Required Imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch gift card details
export const fetchGiftCardDetails = createAsyncThunk(
  'giftCard/fetchDetails',
  async (giftCardId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`http://3.218.8.102/api/giftcards/${giftCardId}`, {
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

// Redux slice for gift card
const giftCardSlice = createSlice({
  name: 'giftCard',
  initialState: {
    giftCard: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftCardDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGiftCardDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCard = action.payload;
      })
      .addCase(fetchGiftCardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Store configuration
const store = configureStore({
  reducer: {
    giftCard: giftCardSlice.reducer,
  },
});

// GiftCardDetails Component
function GiftCardDetails({ giftCardId, onBack }) {
  const dispatch = useDispatch();
  const { giftCard, loading, error } = useSelector((state) => state.giftCard);

  useEffect(() => {
    dispatch(fetchGiftCardDetails(giftCardId));
  }, [dispatch, giftCardId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">Gift Card Details</h2>
      <p><strong>Name:</strong> {giftCard?.name}</p>
      <p><strong>Amount:</strong> ${giftCard?.giftcardamount}</p>
      <p><strong>Added Date:</strong> {giftCard?.addDate}</p>
      <button
        onClick={() => window.location.href = `http://3.218.8.102/giftcard/${giftCard?.id}/edit`}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Edit Gift Card
      </button>
      <button
        onClick={onBack}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-4"
      >
        Back
      </button>
    </div>
  );
}

export default GiftCardDetails;
export { store };
