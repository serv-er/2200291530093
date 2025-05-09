// src/components/CorrelationHeatmap.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, fetchPrices } from '../features/stocks/stockSlice';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CorrelationHeatmap = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { stockList, prices } = useSelector((state) => state.stocks);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [minutes, setMinutes] = useState(30);
  const [correlationMatrix, setCorrelationMatrix] = useState([]);

  useEffect(() => {
    if (token) {
      dispatch(fetchStocks(token));
    }
  }, [token]);

  useEffect(() => {
    if (selectedStocks.length && token) {
      selectedStocks.forEach((ticker) => {
        dispatch(fetchPrices({ token, ticker, minutes }));
      });
    }
  }, [selectedStocks, minutes, token]);

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      calculateCorrelationMatrix();
    }
  }, [prices]);

  const calculateCorrelationMatrix = () => {
    const stockSymbols = Object.keys(prices);
    const matrix = stockSymbols.map((symbol) => {
      const pricesData = prices[symbol].map((price) => price.price);
      return stockSymbols.map((compareSymbol) => {
        if (symbol === compareSymbol) return 1; // Perfect correlation with itself
        const comparePrices = prices[compareSymbol].map((price) => price.price);
        const correlation = calculateCorrelation(pricesData, comparePrices);
        return correlation;
      });
    });
    setCorrelationMatrix(matrix);
  };

  const calculateCorrelation = (arr1, arr2) => {
    const n = arr1.length;
    const mean1 = arr1.reduce((a, b) => a + b, 0) / n;
    const mean2 = arr2.reduce((a, b) => a + b, 0) / n;
    const numerator = arr1.reduce((sum, value, index) => sum + (value - mean1) * (arr2[index] - mean2), 0);
    const denominator = Math.sqrt(
      arr1.reduce((sum, value) => sum + Math.pow(value - mean1, 2), 0) *
      arr2.reduce((sum, value) => sum + Math.pow(value - mean2, 2), 0)
    );
    return numerator / denominator;
  };

  const handleStockChange = (e) => {
    setSelectedStocks(e.target.value);
  };

  const prepareCorrelationData = () => {
    const labels = Object.keys(prices);
    const matrixData = [];

    for (let i = 0; i < correlationMatrix.length; i++) {
      for (let j = 0; j < correlationMatrix[i].length; j++) {
        if (i !== j) {
          matrixData.push({
            stock1: labels[i],
            stock2: labels[j],
            correlation: correlationMatrix[i][j],
          });
        }
      }
    }

    return matrixData;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h2>Stock Correlation Heatmap</h2>
      <Grid container spacing={2}>
        <Grid item>
          <Select
            multiple
            value={selectedStocks}
            onChange={handleStockChange}
            renderValue={(selected) => selected.join(', ')}
            size="small"
          >
            {Object.entries(stockList).map(([name, symbol]) => (
              <MenuItem key={symbol} value={symbol}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            size="small"
          >
            {[10, 30, 60].map((m) => (
              <MenuItem key={m} value={m}>
                {m} min
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {correlationMatrix.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={prepareCorrelationData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stock1" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="correlation" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default CorrelationHeatmap;
