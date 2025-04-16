/**
 * Represents a game event.
 */
export interface Event {
  event_type: string;
  description: string;
  percent_3months: number;
  percent_6months: number;
  percent_1year: number;
  percent_5years: number;
}

/**
 * Represents a user investment.
 */
export interface Investment {
  description: string;
  investment_amount: number;
  time_interval: number;
  time_remaining: number;
  percent_change: number;
  type: InvestmentType;
}

export type InvestmentType = "Invest" | "Short" | "Skip";

export type TimeInterval = "" | "3 months" | "6 months" | "1 year" | "5 years";

export interface InvestmentHistory {
  turn: string;
  balance: number;
}

export const INTERVAL_MAPPING = {
  "": { time: 0, percent: 0 },
  "3 months": { time: 1, percent: 0 }, // percent is populated dynamically
  "6 months": { time: 2, percent: 0 },
  "1 year": { time: 4, percent: 0 },
  "5 years": { time: 20, percent: 0 },
};

export const GAME_CONSTANTS = {
  STARTING_BALANCE: 10000,
  MONTH_COEFFICIENT: 3,
  BALANCE_THRESHOLD: 10000,
};
