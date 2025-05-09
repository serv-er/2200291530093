// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../api/auth';

export const fetchToken = createAsyncThunk('auth/fetchToken', async (_, { rejectWithValue }) => {
  try {
    const token = await getToken();
    return token;
  } catch (error) {
    console.error('Token fetch failed:', error.message); // Log the error message
    return rejectWithValue(error.message); // Pass the error to the slice
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch token';
      });
  },
});

export default authSlice.reducer;
