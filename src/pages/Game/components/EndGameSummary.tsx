import React, { useEffect } from "react";
import { Investment, InvestmentHistory } from "../../../types/types";
import { formatCurrency } from "../../../utils/investmentUtils";
import {
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { renderLineChart } from "../../../components/game/LineChart";
import { InvestmentCards } from "../../../components/game/InvestmentCards";
import { useGame } from "../../../contexts/GameContext";

/**
 * This component can accept props for backward compatibility,
 * but also demonstrates how to use the context directly
 */
interface EndGameSummaryProps {
  balance?: number;
  balanceHistory?: InvestmentHistory[];
  completedInvestments?: Investment[];
  liveInvestments?: Investment[];
  finalizeGame?: () => void;
  finalizedGame?: boolean;
}

/**
 * Displays a summary of the game results when the game is over
 */
const EndGameSummary: React.FC<EndGameSummaryProps> = (props) => {
  // Get game data from context if not provided via props
  const gameContext = useGame();

  // Use props if provided, otherwise fall back to context values
  const balance = props.balance ?? gameContext.userBalance;
  const balanceHistory = props.balanceHistory ?? gameContext.balanceHistory;
  const completedInvestments =
    props.completedInvestments ?? gameContext.completedUserInvestments;
  const liveInvestments =
    props.liveInvestments ?? gameContext.liveUserInvestments;
  const finalizeGame = props.finalizeGame ?? gameContext.finalizeGame;
  const finalizedGame = props.finalizedGame ?? gameContext.finalizedGame;

  // Ensure the game is finalized
  useEffect(() => {
    if (!finalizedGame) {
      finalizeGame();
    }
  }, [finalizedGame, finalizeGame]);

  // Calculate some statistics
  const totalInvestments = completedInvestments.length + liveInvestments.length;

  const skippedInvestments = [
    ...completedInvestments,
    ...liveInvestments,
  ].filter((inv) => inv.type === "Skip").length;

  const shortInvestments = [...completedInvestments, ...liveInvestments].filter(
    (inv) => inv.type === "Short",
  ).length;

  return (
    <Container
      maxWidth={"xl"}
      sx={{ height: "calc(100vh - var(--header-height))", p: "5px" }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={6} sx={{ height: "50%", maxHeight: "50%" }}>
          <Paper
            sx={{
              p: 3,
              mb: 2,
              bgcolor: "#f5f5f5",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ mb: 1.5 }}
              >
                Final balance: {formatCurrency(balance)}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Total decisions: {totalInvestments}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Shorted: {shortInvestments}
              </Typography>
              <Typography variant="body1">
                Skipped opportunities: {skippedInvestments}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={6} sx={{ height: "50%", maxHeight: "50%" }}>
          <Paper
            sx={{
              p: 3,
              mb: 2,
              bgcolor: "#f5f5f5",
              height: "100%",
              overflow: "auto",
            }}
          >
            <InvestmentCards
              choicesToProcess={completedInvestments}
              areFinalized={true}
            />
            <Divider sx={{ my: 5 }} />
            <InvestmentCards
              choicesToProcess={liveInvestments}
              areFinalized={true}
              liveAtGameOver={true}
            />
          </Paper>
        </Grid>

        <Grid size={12} sx={{ height: "40%", maxHeight: "40%" }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Balance History
            </Typography>
            <Box sx={{ height: "100%" }}>{renderLineChart(balanceHistory)}</Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EndGameSummary;
