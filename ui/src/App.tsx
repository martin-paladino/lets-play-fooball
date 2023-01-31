import React from 'react';
import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import TeamDetail from './pages/Teams/team-detail';
import PlayerDetail from './pages/Players/player-detail';
import AddEditPlayer from './pages/Players/add-edit-player';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/equipos" element={<Teams />} />
        <Route path="/jugadores" element={<Players />} />
        <Route path="/jugadores/nuevo" element={<AddEditPlayer />} />
        <Route path="/jugadores/:id/editar" element={<AddEditPlayer />} />
        <Route path="/jugadores/:id" element={<PlayerDetail />} />
        <Route path="/equipos/:id" element={<TeamDetail />}/>
      </Routes>
      </>
  );
}

export default App;