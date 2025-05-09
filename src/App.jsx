import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StockPage from './pages/stockPage'
import CorrelationHeatmap from './pages/CorrelationHeatmap'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/stocks" />} />
          <Route path="/stocks" element={<StockPage />} />
          <Route path="/heatmap" element={<CorrelationHeatmap />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
