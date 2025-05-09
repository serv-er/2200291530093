// src/pages/StockPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../features/auth/authSlice';
import { fetchStocks, fetchPrices } from '../features/stocks/stockSlice';
import { register } from '../api/auth'; // 💡 Add this import
import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { MenuItem, Select } from '@mui/material';

const StockPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { stockList, prices } = useSelector((state) => state.stocks);
  const [selectedStock, setSelectedStock] = useState('');
  const [minutes, setMinutes] = useState(30);

  // 🟨 Register user once on first mount
  useEffect(() => {
    const alreadyRegistered = localStorage.getItem('isRegistered');
    console.log('Already registered?', alreadyRegistered);
  
    (async () => {
      try {
        if (!alreadyRegistered) {
          console.log('Calling register()...');
          await register();
          localStorage.setItem('isRegistered', 'true');
          console.log('Registered successfully!');
        }
        dispatch(fetchToken());
      } catch (err) {
        console.error('Registration failed:', err.response?.data || err.message);
      }
    })();
  }, []);
  
  

  // 🟩 After token is available, fetch stocks
  useEffect(() => {
    if (token) {
      dispatch(fetchStocks(token));
    }
  }, [token]);

  // 🟦 Fetch prices when stock or interval changes
  useEffect(() => {
    if (selectedStock && token) {
      dispatch(fetchPrices({ token, ticker: selectedStock, minutes }));
    }
  }, [selectedStock, minutes, token]);

  const data = prices[selectedStock] || [];

  const average =
    data.reduce((acc, item) => acc + item.price, 0) / (data.length || 1);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Stock Price Chart</h2>

      <Select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
        displayEmpty
        style={{ marginRight: '1rem' }}
      >
        <MenuItem value="" disabled>Select Stock</MenuItem>
        {Object.entries(stockList).map(([name, symbol]) => (
          <MenuItem value={symbol} key={symbol}>{name}</MenuItem>
        ))}
      </Select>

      <Select
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
      >
        {[10, 30, 60].map((m) => (
          <MenuItem key={m} value={m}>{m} min</MenuItem>
        ))}
      </Select>

      {data.length > 0 ? (
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid />
          <XAxis dataKey="lastUpdatedAt" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#1976d2" />
          <Line
            type="monotone"
            dataKey={() => average}
            stroke="#ff5722"
            dot={false}
          />
        </LineChart>
      ) : (
        <p style={{ marginTop: '2rem' }}>No data to display. Please select a stock.</p>
      )}
    </div>
  );
};

export default StockPage;
