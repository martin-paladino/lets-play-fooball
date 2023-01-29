import React from 'react';
import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos/" element={<Teams />} />
        <Route path="/jugadores" element={<Players />} />
      </Routes>
      </>
  );
}

export default App;