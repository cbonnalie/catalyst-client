import { useState, useEffect, useCallback } from "react";
import {
  Event,
  Investment,
  InvestmentHistory,
  InvestmentType,
  TimeInterval,
  GAME_CONSTANTS,
  INTERVAL_MAPPING,
} from "../types/types";
import {
  calculateInvestmentGain,
  getPercentageForInterval,
} from "../utils/investmentUtils";
import { fetchEvents } from "../services/DBFunctions.ts";

/**
 * Main hook that manages the game state and logic
 * @param retryCounter Optional counter to trigger re-fetching on retry
 * @param initialRoundsToPlay Optional initial number of rounds to play
 */
export const useGameEngine = (
  retryCounter: number = 0,
  initialRoundsToPlay: number = 5,
) => {
  // State for game events
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Start as false
  const [error, setError] = useState<string | null>(null);
  const [roundsToPlay, setRoundsToPlay] = useState<number>(initialRoundsToPlay);

  // Game progress state
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [currentQuarter, setCurrentQuarter] = useState<number>(1);
  const [currentYear, setCurrentYear] = useState<number>(1);

  // Investment state
  const [userBalance, setUserBalance] = useState<number>(
    GAME_CONSTANTS.STARTING_BALANCE,
  );
  const [balanceHistory, setBalanceHistory] = useState<InvestmentHistory[]>([
    { turn: `Y1 Q1`, balance: GAME_CONSTANTS.STARTING_BALANCE },
  ]);
  const [liveUserInvestments, setLiveUserInvestments] = useState<Investment[]>(
    [],
  );
  const [completedUserInvestments, setCompletedUserInvestments] = useState<
    Investment[]
  >([]);
  const [recentlyCompletedInvestments, setRecentlyCompletedInvestments] =
    useState<Investment[]>([]);

  // UI state
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [selectedInterval, setSelectedInterval] = useState<TimeInterval>("");
  const [selectedType, setSelectedType] = useState<InvestmentType | "">("");
  const [finalizedGame, setFinalizedGame] = useState<boolean>(false);

  // Get current event
  const currentEvent = events[currentEventIndex] || null;
  const isGameOver = currentEventIndex >= events.length;

  // Function to start the game and fetch events
  const startGame = useCallback(async (rounds: number) => {
    setRoundsToPlay(rounds);
    setLoading(true);
    setError(null);

    try {
      // Fetch the specified number of events
      const fetchedEvents = await fetchEvents(rounds);

      if (fetchedEvents.length === 0) {
        setError("No events were returned from the server");
      } else {
        setEvents(fetchedEvents);
        console.log(`Fetched ${fetchedEvents.length} events`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle retries
  useEffect(() => {
    if (retryCounter > 0) {
      startGame(roundsToPlay);
    }
  }, [retryCounter, roundsToPlay, startGame]);

  // Record balance history when quarter changes
  useEffect(() => {
    if (!loading && currentEvent) {
      const turn = `Y${currentYear} Q${currentQuarter}`;
      setBalanceHistory((prev) => {
        if (prev.some((entry) => entry.turn === turn)) return prev;
        return [...prev, { turn, balance: userBalance }];
      });
    }
  }, [currentYear, currentQuarter, userBalance, loading, currentEvent]);

  /**
   * Advances the game to the next turn
   */
  const advanceTurn = () => {
    setCurrentEventIndex((prev) => prev + 1);
    setCurrentQuarter((prev) => (prev % 4) + 1);
    if (currentQuarter === 4) {
      setCurrentYear((prev) => prev + 1);
    }
  };

  /**
   * Updates investments based on user selection
   */
  const updateInvestments = (newInvestment: Investment) => {
    setLiveUserInvestments((prev) => [...prev, newInvestment]);

    if (newInvestment.type === "Invest") {
      setUserBalance((prev) => prev - newInvestment.investment_amount);
    } else if (newInvestment.type === "Short") {
      setUserBalance((prev) => prev + newInvestment.investment_amount);
    }
  };

  /**
   * Processes the current investments and updates completed ones
   */
  const processInvestments = () => {
    setLiveUserInvestments((prevLiveInvestments) => {
      const updatedInvestments = prevLiveInvestments.map((investment) => ({
        ...investment,
        time_remaining: investment.time_remaining - 1,
      }));

      const expiredInvestments = updatedInvestments.filter(
        (inv) => inv.time_remaining === 0,
      );
      const remainingInvestments = updatedInvestments.filter(
        (inv) => inv.time_remaining > 0,
      );

      if (expiredInvestments.length > 0) {
        setRecentlyCompletedInvestments(expiredInvestments);
        setCompletedUserInvestments((prev) => [...prev, ...expiredInvestments]);

        setUserBalance((prevBalance) => {
          return expiredInvestments.reduce((total, inv) => {
            if (inv.type === "Skip") return total;

            const gain = calculateInvestmentGain(inv);

            if (inv.type === "Short") {
              return total - inv.investment_amount + gain;
            }

            return total + inv.investment_amount + gain;
          }, prevBalance);
        });
      }

      return remainingInvestments;
    });
  };

  /**
   * Handles the user's investment submission
   */
  const handleSubmit = () => {
    if (!currentEvent) return;

    if (
      (!investmentAmount || !selectedInterval || !selectedType) &&
      selectedType !== "Skip"
    ) {
      console.log("Invalid submission: Missing information");
      return;
    }

    const investment = parseFloat(investmentAmount);
    if (
      (isNaN(investment) || investment <= 0 || investment > userBalance) &&
      selectedType !== "Skip"
    ) {
      console.log(
        "Invalid investment amount:",
        investment,
        "user balance:",
        userBalance,
      );
      return;
    }

    const intervalInfo = INTERVAL_MAPPING[selectedInterval];
    const percent = selectedInterval
      ? getPercentageForInterval(selectedInterval, currentEvent)
      : 0;

    updateInvestments({
      description: currentEvent.description,
      investment_amount: investment || 0,
      time_interval: selectedInterval ? intervalInfo.time : 1, // Default to 1 for Skip
      time_remaining: selectedInterval ? intervalInfo.time : 1, // Default to 1 for Skip
      percent_change: percent,
      type: selectedType as InvestmentType,
    });

    // Reset form
    setInvestmentAmount("");
    setSelectedInterval("");
    setSelectedType("");

    // Advance game
    advanceTurn();
    processInvestments();
  };

  /**
   * Finalizes the game and calculates final balance
   */
  const finalizeGame = () => {
    if (finalizedGame) return;

    const additionalBalance = liveUserInvestments.reduce(
      (total, investment) => {
        if (investment.type === "Skip") return total;

        const gain = calculateInvestmentGain(investment);

        if (investment.type === "Short") {
          return total - investment.investment_amount + gain;
        }

        return total + investment.investment_amount + gain;
      },
      0,
    );

    const finalBalance = userBalance + additionalBalance;
    setUserBalance(finalBalance);

    setBalanceHistory((prev) => {
      const turn = `Y${currentYear} Q${currentQuarter}`;
      if (prev.some((entry) => entry.turn === turn)) return prev;
      return [...prev, { turn, balance: finalBalance }];
    });

    setFinalizedGame(true);
  };

  return {
    // Game data
    events,
    loading,
    error,
    currentEvent,

    // Game state
    investmentAmount,
    selectedInterval,
    selectedType,
    currentYear,
    currentQuarter,
    userBalance,
    balanceHistory,
    completedUserInvestments,
    recentlyCompletedInvestments,
    liveUserInvestments,
    finalizedGame,
    isGameOver,
    roundsToPlay,

    // Actions
    setInvestmentAmount,
    setSelectedInterval,
    setSelectedType,
    handleSubmit,
    finalizeGame,
    startGame,
  };
};
