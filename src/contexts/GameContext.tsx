import React, { createContext, useContext, ReactNode, useState } from "react";
import {
  Event,
  Investment,
  InvestmentHistory,
  InvestmentType,
  TimeInterval,
} from "../types/types.ts";
import { useGameEngine } from "../hooks/useGameEngine.ts";

/**
 * All properties and methods exposed by the GameContext
 */
interface GameContextProps {
  // game data
  events: Event[];
  loading: boolean;
  error: string | null;
  currentEvent: Event | null;

  // game state
  investmentAmount: string;
  selectedInterval: TimeInterval;
  selectedType: InvestmentType | "";
  currentYear: number;
  currentQuarter: number;
  userBalance: number;
  balanceHistory: InvestmentHistory[];
  completedUserInvestments: Investment[];
  recentlyCompletedInvestments: Investment[];
  liveUserInvestments: Investment[];
  finalizedGame: boolean;
  isGameOver: boolean;
  roundsToPlay: number;

  // actions
  setInvestmentAmount: (amount: string) => void;
  setSelectedInterval: (interval: TimeInterval) => void;
  setSelectedType: (type: InvestmentType | "") => void;
  startGame: (rounds: number) => Promise<void>;
  handleSubmit: () => void;
  finalizeGame: () => void;
  handleRetry: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [retryCounter, setRetryCounter] = useState<number>(0);
  const [roundsToPlay, setRoundsToPlay] = useState<number>(5);
  const gameEngine = useGameEngine(retryCounter, roundsToPlay);

  const handleRetry = () => {
    setRetryCounter((prev) => prev + 1);
  };

  const contextValue: GameContextProps = {
    ...gameEngine,
    roundsToPlay,
    handleRetry,

    startGame: async (rounds: number) => {
      setRoundsToPlay(rounds);
      await gameEngine.startGame(rounds);
    },
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
