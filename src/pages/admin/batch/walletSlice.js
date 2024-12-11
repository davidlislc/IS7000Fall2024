import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    walletData: null,
    loading: false,
    error: null,
};

export const fetchWallet = createAsyncThunk('wallet/fetchWallet', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://3.218.8.102/api/wallets/1', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
});

export const updateWallet = createAsyncThunk(
    'wallet/updateWallet',
    async (walletData) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `http://3.218.8.102/api/wallets/${walletData.id}`,
            walletData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
);

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWallet.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWallet.fulfilled, (state, action) => {
                state.walletData = action.payload;
                state.loading = false;
            })
            .addCase(fetchWallet.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateWallet.fulfilled, (state, action) => {
                state.walletData = action.payload;
            });
    },
});

export default walletSlice.reducer;
