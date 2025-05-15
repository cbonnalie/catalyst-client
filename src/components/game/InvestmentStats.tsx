import React from "react";
import {Grid, Paper, Box} from "@mui/material";
import {InvestmentCards} from "./InvestmentCards.tsx";
import {Investment, InvestmentHistory} from "../../types/types.ts";
import {renderLineChart} from "./RenderLineChart.tsx";

interface InvestmentStatsProps {
    balanceHistory: InvestmentHistory[];
    completedUserInvestments: Investment[];
    liveUserInvestments: Investment[];
    isMobile: boolean;
}

export const InvestmentStats: React.FC<InvestmentStatsProps> = (
    {
        balanceHistory,
        completedUserInvestments,
        liveUserInvestments,
        isMobile
    }) => {
    return (
        isMobile
            ? (
                <Grid container spacing={1} sx={{height: "100%", padding: "0"}}>
                    <Grid size={12} sx={{height: "100%"}}>
                        <Box sx={{display: "flex", flexDirection: "column", height: "100%", maxHeight: "100%", overflow: "hidden"}}>
                            {/* this box is ruining my life */}
                            <Box sx={{height: "100%", maxHeight: "100%", overflow: "hidden", outline: "1px solid red"}}>
                                {renderLineChart(balanceHistory)}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            )
            : (
                <Grid container spacing={1} sx={{height: "100%", padding: "20px 0"}}>
                    {/* Current Investments Column */}
                    <Grid size={4} sx={{height: "100%"}}>
                        <Paper
                            sx={{
                                p: 1,
                                bgcolor: "#f8f8f8",
                                height: "100%",
                                maxHeight: "calc(100vh - 300px)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    overflow: "auto",
                                    maxHeight: "100%",
                                }}
                            >
                                <InvestmentCards
                                    choicesToProcess={completedUserInvestments}
                                    areFinalized={true}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Balance Chart Column */}
                    <Grid size={4} sx={{height: "100%", minHeight: "40vh"}}>
                        <Box sx={{display: "flex", flexDirection: "column", height: "100%"}}>
                            <Box sx={{flex: 1, height: "calc(100% - 30px)"}}>
                                {renderLineChart(balanceHistory)}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Live Investments Column */}
                    <Grid size={4} sx={{height: "100%"}}>
                        <Paper
                            sx={{
                                p: 1,
                                bgcolor: "#f8f8f8",
                                height: "100%",
                                maxHeight: "calc(100vh - 300px)",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    overflow: "auto",
                                    maxHeight: "100%",
                                }}
                            >
                                <InvestmentCards
                                    choicesToProcess={liveUserInvestments}
                                    areFinalized={false}
                                />
                            </Box>
                        </Paper>
                    </Grid>

                </Grid>
            ));
};
