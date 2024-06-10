import React, { useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import EditingArea from './components/EditingArea/EditingArea';
import SettingsWindow from './components/SettingsWindow/SettingsWindow';
import EditWindow from './pages/EditWindow/EditWindow';
import Welcome from './pages/WelcomePage/Welcome';

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
