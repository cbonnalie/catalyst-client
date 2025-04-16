import React from "react";
import { Investment, GAME_CONSTANTS } from "../../types/types";
import {
  calculateInvestmentGain,
  formatCurrency,
  formatPercentage,
} from "../../utils/investmentUtils";

interface InvestmentListProps {
  title: string;
  investments: Investment[];
  isCompleted: boolean;
}

/**
 * Displays a list of investments with detailed information
 */
const InvestmentList: React.FC<InvestmentListProps> = ({
  title,
  investments,
  isCompleted,
}) => {
  /**
   * Formats the length of investment for display
   */
  const formatInvestmentLength = (months: number): string => {
    const totalMonths = GAME_CONSTANTS.MONTH_COEFFICIENT * months;
    return `${totalMonths} ${totalMonths === 1 ? "month" : "months"}`;
  };

  /**
   * Formats the gain/loss value with the appropriate sign
   */
  const formatGain = (investment: Investment): string => {
    const gain = calculateInvestmentGain(investment);
    const formattedValue = formatCurrency(Math.abs(gain));

    return gain >= 0 ? `${formattedValue}` : `-${formattedValue}`;
  };

  return (
    <div className="investment-list">
      <h3>{title}</h3>

      {investments.length === 0 ? (
        <p className="no-investments">No investments to show</p>
      ) : (
        investments.map((investment, index) => (
          <div key={index} className="summary-investment">
            <p className="investment-description">{investment.description}</p>

            {investment.type !== "Skip" && (
              <>
                <p>
                  {investment.type === "Invest" ? "Investment: " : "Short: "}
                  {formatCurrency(investment.investment_amount)}
                </p>

                <p>
                  Length of Investment:{" "}
                  {formatInvestmentLength(investment.time_interval)}
                </p>

                {!isCompleted && investment.time_remaining > 0 && (
                  <p>
                    Time Remaining:{" "}
                    {formatInvestmentLength(investment.time_remaining)}
                  </p>
                )}

                <p>
                  Percent Change: {formatPercentage(investment.percent_change)}
                </p>

                <p
                  className={`gain ${calculateInvestmentGain(investment) >= 0 ? "positive" : "negative"}`}
                >
                  Gain: {formatGain(investment)}
                </p>
              </>
            )}

            {investment.type === "Skip" && (
              <p className="skipped">This investment opportunity was skipped</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InvestmentList;
