import React from "react";
import {
  Typography,
  Box,
  Divider,
  Stack,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { Investment } from "../../types/types";
import {
  calculateInvestmentGain,
  formatCurrency,
  formatPercentage,
} from "../../utils/investmentUtils";

/**
 * Props for the InvestmentCards component.
 */
interface InvestmentCardsProps {
  choicesToProcess: Investment[];
  areFinalized: boolean;
  liveAtGameOver?: boolean;
}

/**
 * Displays a card for each investment with relevant details
 */
export const InvestmentCards: React.FC<InvestmentCardsProps> = ({
  choicesToProcess,
  areFinalized,
  liveAtGameOver,
}) => {
  /**
   * Get title based on the investment status
   */
  const getCardTitle = () => {
    if (liveAtGameOver) {
      return "Live Investments Cashed Out";
    } else if (areFinalized) {
      return "Completed Investments";
    } else {
      return "Current Investments";
    }
  };

  /**
   * Get the color for the investment type chip
   */
  const getChipColor = (type: string) => {
    switch (type) {
      case "Invest":
        return "success";
      case "Short":
        return "error";
      case "Skip":
        return "default";
      default:
        return "primary";
    }
  };

  /**
   * Renders the details of an investment based on its type and status
   */
  const renderInvestmentDetails = (investment: Investment) => {
    if (investment.type === "Skip") {
      return (
        <Typography variant="body2" color="text.secondary">
          Skipped this event
        </Typography>
      );
    }

    const investmentAmountFormatted = formatCurrency(
      investment.investment_amount,
    );
    const percentChangeFormatted = formatPercentage(investment.percent_change);
    const gain = calculateInvestmentGain(investment);
    const gainFormatted = formatCurrency(Math.abs(gain));
    const isPositiveGain = gain >= 0;

    return (
      <Stack spacing={1}>
        <Typography variant="body2">
          {investment.type === "Invest" ? "Investment: " : "Short: "}
          {investmentAmountFormatted}
        </Typography>

        {areFinalized && (
          <>
            <Typography variant="body2">
              Percent Change: {percentChangeFormatted}
            </Typography>
            <Typography
              variant="body2"
              color={isPositiveGain ? "success.main" : "error.main"}
              fontWeight="medium"
            >
              Gain: {isPositiveGain ? gainFormatted : `-${gainFormatted}`}
            </Typography>
          </>
        )}
      </Stack>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {getCardTitle()}
      </Typography>

      {choicesToProcess.length === 0 ? (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic", my: 2 }}
        >
          No investments yet
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {choicesToProcess.map((investment, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                "&:last-child": { mb: 0 },
                borderLeft: `4px solid ${
                  investment.type === "Invest"
                    ? "success.main"
                    : investment.type === "Short"
                      ? "error.main"
                      : "grey.400"
                }`,
              }}
            >
              <CardContent sx={{ py: 1.5, px: 2, "&:last-child": { pb: 1.5 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ fontWeight: "medium" }}
                  >
                    {investment.description}
                  </Typography>
                  <Chip
                    label={investment.type}
                    size="small"
                    color={getChipColor(investment.type) as any}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Divider sx={{ my: 1 }} />
                {renderInvestmentDetails(investment)}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};
