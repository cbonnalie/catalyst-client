import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

interface StatusFooterProps {
  userBalance: number;
  finalizedGame: boolean;
  currentYear: number;
  currentQuarter: number;
}

export const Status: React.FC<StatusFooterProps> = ({
  userBalance,
  finalizedGame,
  currentYear,
  currentQuarter,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      height="100%"
    >
      {/* Balance Display */}
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Paper sx={{ height: "100%", width: "fit-content", p: "0 10px" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            fontSize="clamp(10px, 36px, 36px)"
          >
            ${userBalance.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>

      {/* Date Display */}
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        {!finalizedGame && (
          <Paper sx={{ height: "100%", width: "fit-content", p: "0 10px" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="clamp(10px, 36px, 36px)"
            >
              Year {currentYear} Quarter {currentQuarter}
            </Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
