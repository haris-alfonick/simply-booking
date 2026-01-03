import React from 'react'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './component/Homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/homepage' element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
