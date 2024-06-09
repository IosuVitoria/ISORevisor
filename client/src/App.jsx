import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Controldocumental from './pages/Controldocumental/Controldocumental';
import Navbar from './shared/Navbar/Navbar';
import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/controldocumental" element={<Controldocumental />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
