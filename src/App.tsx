import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Game from "./pages/Game/Game";
import "./styles/reset.css";
import "./styles/global.css";

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
