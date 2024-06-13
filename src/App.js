import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditWindow from './pages/EditWindow/EditWindow';

function App() {

  return (
    <Router>
      <div className="App">
          <Routes>
              <Route path="/" element={<Navigate to="/edit-chatbot" />} />
              {/* <Route path="/welcome" element={<Welcome/>} /> */}
              <Route path="/edit-chatbot" element={<EditWindow/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
