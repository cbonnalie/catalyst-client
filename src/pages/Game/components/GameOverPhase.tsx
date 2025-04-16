import React, { useEffect } from "react";
import EndGameSummary from "./EndGameSummary";
import { useGame } from "../../../contexts/GameContext";

/**
 * Component that displays the game over screen with final results
 * Now uses the GameContext instead of receiving props
 */
export const GameOverPhase: React.FC = () => {
  // Get the needed state and functions from the game context
  const {
    userBalance,
    balanceHistory,
    completedUserInvestments,
    liveUserInvestments,
    finalizeGame,
    finalizedGame,
  } = useGame();

  // Ensure game is finalized when this component mounts
  useEffect(() => {
    if (!finalizedGame) {
      finalizeGame();
    }
  }, [finalizedGame, finalizeGame]);

  return (
    <EndGameSummary
      balance={userBalance}
      balanceHistory={balanceHistory}
      completedInvestments={completedUserInvestments}
      liveInvestments={liveUserInvestments}
      finalizeGame={finalizeGame}
      finalizedGame={finalizedGame}
    />
  );
};
