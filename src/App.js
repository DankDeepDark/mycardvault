import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import QRScanPage from './components/QRScanPage';
import Login from './components/Login';
import Register from './components/Register';
import CardListPage from './components/CardListPage';
import AddCardPage from './components/AddCardPage';
import TransactPage from './components/TransactPage';
import Profile from './components/Profile';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/scan" element={<PrivateRoute><QRScanPage /></PrivateRoute>} />
        <Route path="/cards" element={<PrivateRoute><CardListPage /></PrivateRoute>} />
        <Route path="/add-card" element={<PrivateRoute><AddCardPage /></PrivateRoute>} />
        <Route path="/transact/:id" element={<PrivateRoute><TransactPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </Layout>
  );
}

export default App;
