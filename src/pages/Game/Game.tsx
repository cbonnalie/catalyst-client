import React, { useState } from "react";
import { GameLayout } from "../../layouts/GameLayout";
import { ActiveGamePhase } from "./components/ActiveGamePhase";
import { GameOverPhase } from "./components/GameOverPhase";
import { useGame } from "../../contexts/GameContext";
import LoadingScreen from "../../components/common/LoadingScreen";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import GameSetup from "./components/GameSetup";

/**
 * Main Game component that manages the overall game flow
 */
const Game: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const { events, loading, error, isGameOver, handleRetry, startGame } =
    useGame();

  const handleStartGame = (rounds: number) => {
    setGameStarted(true);
    startGame(rounds).then();
  };

  if (!gameStarted) {
    return (
      <GameLayout>
        <GameSetup onStartGame={handleStartGame} />
      </GameLayout>
    );
  }

  if (loading) {
    return (
      <GameLayout>
        <LoadingScreen />
      </GameLayout>
    );
  }

  if (error) {
    return (
      <GameLayout>
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </GameLayout>
    );
  }

  if (events.length === 0) {
    return (
      <ErrorDisplay
        message="No events found. Please try again or check your connection."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <GameLayout>
      {isGameOver ? <GameOverPhase /> : <ActiveGamePhase />}
    </GameLayout>
  );
};

export default Game;
