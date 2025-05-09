// src/features/stocks/stockSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllStocks, getStockPrices } from '../../api/stocks';

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async (token) => {
  const data = await getAllStocks(token);
  return data;
});

export const fetchPrices = createAsyncThunk(
  'stocks/fetchPrices',
  async ({ token, ticker, minutes }) => {
    const data = await getStockPrices(token, ticker, minutes);
    return { ticker, data };
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState: {
    stockList: {},
    prices: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.stockList = action.payload;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.prices[action.payload.ticker] = action.payload.data;
      });
  },
});

export default stockSlice.reducer;
