/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Recipes from './components/Recipes';
import Ingredients from './components/Ingredients';
import Insert from './components/Insert';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/insert" element={<Insert />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);