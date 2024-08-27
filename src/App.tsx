import React from 'react';
import logo from './icon.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <ConditionalNavbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  return location.pathname !== '/login' ? <Navbar /> : null;
}

export default App;
