import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Subscription from './components/Subscription';
import Admin from './components/Admin';
import Login from './components/login';
function App() {
  return (
    <Router>
      <Navbar />  {/* The Navbar will be visible on all pages */}
      
      <div className="mt-20"> {/* To push content below the fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
