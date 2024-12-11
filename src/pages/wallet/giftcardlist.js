import React, { useEffect } from 'react';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Async thunk for fetching gift cards
const fetchGiftCards = createAsyncThunk(
  'giftCards/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://3.218.8.102/api/giftcards?page=0&size=20&sort=id,asc&cacheBuster=1732246285725', {
        headers: {
          'Authorization': Bearer ${token},
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

// Redux slice for managing gift card state
const giftCardSlice = createSlice({
  name: 'giftCards',
  initialState: {
    giftCards: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGiftCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGiftCards.fulfilled, (state, action) => {
        state.loading = false;
        state.giftCards = action.payload;
      })
      .addCase(fetchGiftCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Configure the Redux store
const store = configureStore({
  reducer: {
    giftCards: giftCardSlice.reducer
  }
});

// GiftCardList component
function GiftCardList({ onViewGiftCard }) {
  const dispatch = useDispatch();
  const { giftCards, loading, error } = useSelector(state => state.giftCards);

  useEffect(() => {
    dispatch(fetchGiftCards());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">Gift Cards</h2>
      <ul>
        {giftCards.map((card) => (
          <li key={card.id} className="mb-2 flex justify-between items-center">
            {card.name}: ${card.giftcardamount}
            <button
              onClick={() => onViewGiftCard(card.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Wrap the component in the Redux Provider
function App() {
  const handleViewGiftCard = (id) => {
    console.log('View gift card with ID:', id);
  };

  return (
    <Provider store={store}>
      <GiftCardList onViewGiftCard={handleViewGiftCard} />
    </Provider>
  );
}

export default App;
