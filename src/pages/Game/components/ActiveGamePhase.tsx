import React from "react";
import {Container, Paper, Box, useTheme, useMediaQuery} from "@mui/material";
import EventCardInput from "../../../components/game/EventCardInput";
import {Status} from "../../../components/game/Status.tsx";
import {InvestmentStats} from "../../../components/game/InvestmentStats";
import {InvestmentType, TimeInterval} from "../../../types/types";
import {useGame} from "../../../contexts/GameContext";

export const ActiveGamePhase: React.FC = () => {
    const {
        userBalance,
        finalizedGame,
        currentYear,
        currentQuarter,
        balanceHistory,
        completedUserInvestments,
        liveUserInvestments,
        investmentAmount,
        selectedInterval,
        selectedType,
        currentEvent,
        handleSubmit,
        setInvestmentAmount,
        setSelectedInterval,
        setSelectedType,
    } = useGame();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newType = e.target.value as InvestmentType;
        setSelectedType(newType);

        if (newType === "Skip") {
            setInvestmentAmount("");
            setSelectedInterval("");
        }
    };

    if (!currentEvent) {
        return null;
    }

    return (
        <Container
            maxWidth={"xl"}
            sx={{height: "calc(100vh - var(--header-height))"}}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Status */}
                <Box sx={{height: "10%", p: "5px"}}>
                    <Status
                        userBalance={userBalance}
                        finalizedGame={finalizedGame}
                        currentYear={currentYear}
                        currentQuarter={currentQuarter}
                        isMobile={isMobile}
                    />
                </Box>

                {/* Event Card Section - Top section */}
                <Box sx={{height: "auto", p: "5px"}}>
                    <Paper sx={{p: 1, mb: 1, height: "100%"}}>
                        <EventCardInput
                            event={currentEvent}
                            investmentAmount={investmentAmount}
                            selectedInterval={selectedInterval}
                            selectedType={selectedType}
                            userBalance={userBalance}
                            isMobile={isMobile}
                            onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                            onIntervalChange={(e) =>
                                setSelectedInterval(e.target.value as TimeInterval)
                            }
                            onTypeChange={handleTypeChange}
                            onSubmit={handleSubmit}
                        />
                    </Paper>
                </Box>

                <Box sx={{flex: 1, height: "30%", p: "5px", overflow: "hidden"}}>
                    <Paper sx={{p: 1, height: "100%"}}>
                        <InvestmentStats
                            balanceHistory={balanceHistory}
                            completedUserInvestments={completedUserInvestments}
                            liveUserInvestments={liveUserInvestments}
                            isMobile={isMobile}
                        />
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};
