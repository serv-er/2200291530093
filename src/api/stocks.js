// src/api/stocks.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllStocks = async (token) => {
  const res = await axios.get(`${BASE_URL}/stocks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.stocks;
};

export const getStockPrices = async (token, ticker, minutes) => {
  const res = await axios.get(`${BASE_URL}/stocks/${ticker}?minutes=${minutes}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
