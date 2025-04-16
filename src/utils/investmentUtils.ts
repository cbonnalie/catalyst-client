import { Investment, Event, TimeInterval } from "../types/types";

/**
 * Calculates the gain or loss from an investment
 * @param investment The investment to calculate the gain/loss from
 * @returns The calculated gain/loss value (positive for gain, negative for loss)
 */
export const calculateInvestmentGain = (investment: Investment): number => {
  if (investment.type === "Skip") {
    return 0;
  }

  const rawGain = investment.investment_amount * investment.percent_change;
  // Round to 2 decimal places
  const roundedGain = Math.round(rawGain * 100) / 100;

  if (investment.type === "Short") {
    // For short investments, the gain is inverted:
    // - Positive percent change means we lose money (negative gain)
    // - Negative percent change means we make money (positive gain)
    return -roundedGain;
  }

  return roundedGain;
};

/**
 * Formats a currency value to display with dollar sign and 2 decimal places
 * @param value The currency value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

/**
 * Formats a percentage value for display with % sign
 * @param value The decimal value to format as percentage
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(0)}%`;
};

/**
 * Maps a time interval selection to the appropriate percentage from an event
 * @param interval The selected time interval
 * @param event The current event
 * @returns The corresponding percentage change for the selected interval
 */
export const getPercentageForInterval = (
  interval: TimeInterval,
  event: Event,
): number => {
  switch (interval) {
    case "3 months":
      return event.percent_3months;
    case "6 months":
      return event.percent_6months;
    case "1 year":
      return event.percent_1year;
    case "5 years":
      return event.percent_5years;
    default:
      return 0;
  }
};

/**
 * Validates an investment amount based on the user's balance
 * @param amount The amount to invest
 * @param userBalance The user's current balance
 * @param investmentType The type of investment
 * @returns Whether the investment amount is valid
 */
export const isValidInvestment = (
  amount: string,
  userBalance: number,
  investmentType: string,
): boolean => {
  if (investmentType === "Skip") return true;
  if (!amount) return false;

  const investment = parseFloat(amount);
  return !isNaN(investment) && investment > 0 && investment <= userBalance;
};
