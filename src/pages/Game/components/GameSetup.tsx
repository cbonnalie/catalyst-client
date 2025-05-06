import React, {useState} from "react";
import {GAME_CONSTANTS} from "../../../types/types.ts";
import {
    Grid,
    Button,
    Typography,
    Paper,
    Container,
    useMediaQuery,
    useTheme,
} from "@mui/material";

interface GameSetupProps {
    onStartGame: (rounds: number) => void;
}

/**
 * Game setup component that allows users to select number of rounds before playing
 * Responsive design for both desktop and mobile
 */
const GameSetup: React.FC<GameSetupProps> = ({onStartGame}) => {
    const [rounds, setRounds] = useState<number>(5);
    const [startingBalance] = useState<number>(
        GAME_CONSTANTS.STARTING_BALANCE,
    );

    // For responsive design
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Options for number of rounds
    const roundOptions = [3, 5, 10, 20];

    const handleRoundChange = (value: number) => {
        setRounds(value);
    };

    const handleStartGame = () => {
        onStartGame(rounds);
    };

    return (
        <Container maxWidth={isMobile ? "sm" : "xl"} sx={{height: "100%", py: 2}}>
            <Grid
                container
                spacing={isMobile ? 2 : 3}
                className={"game-setup-container"}
                sx={{
                    height: isMobile ? "auto" : "calc(60vh - var(--header-height))",
                    pt: isMobile ? "0" : "20px"
                }}
            >
                {/* how to play section */}
                <Grid size={12}>
                    <Paper
                        className="setup-section"
                        sx={{p: isMobile ? 2 : 3, mb: 2}}
                    >
                        <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
                            How to play
                        </Typography>
                        <Typography component="p" variant={isMobile ? "body2" : "body1"}>
                            Each round presents a new market event.
                            {!isMobile && <br/>}
                            {' '}You must decide whether to invest in a company based on the event.
                            {!isMobile && <br/>}
                            {' '}Choose your investment amount and type, and select an amount of time to invest.
                            {!isMobile && <br/>}
                            {' '}Watch your balance grow or shrink based on the event's impact.
                            <br/><br/>
                            The game ends after{" "}
                            <Typography
                                component="span"
                                color="primary"
                                fontWeight="bold"
                                display="inline"
                                fontSize={isMobile ? "16px" : "20px"}
                            >
                                {rounds}
                            </Typography>{" "}
                            rounds.
                        </Typography>
                    </Paper>
                </Grid>

                {/* rounds section */}
                <Grid size={12}>
                    {/* heading text */}

                    {/* rounds buttons */}
                    <Paper
                        className="setup-section"
                        sx={{p: isMobile ? 2 : 3, mb: 2}}
                    >
                        <Grid container>
                            <Grid size={isMobile ? 12 : 4}>
                                <Typography variant={isMobile ? "h5" : "h4"} component="h1">
                                    Rounds
                                </Typography>
                            </Grid>
                            <Grid
                                size={isMobile ? 12 : 8}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    flexWrap: "nowrap",
                                    gap: 1,
                                    mt: isMobile ? 1 : 0
                                }}
                            >
                                {roundOptions.map((option) => (
                                    <Button
                                        key={option}
                                        variant="contained"
                                        size={isMobile ? "small" : "medium"}
                                        color={rounds === option ? "primary" : "inherit"}
                                        onClick={() => handleRoundChange(option)}
                                        sx={{
                                            mb: isMobile ? 1 : 0,
                                            mx: isMobile ? 0.5 : 1
                                        }}
                                    >
                                        {option} {isMobile ? "" : "Rounds"}
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* balance section */}
                <Grid size={12}>
                    <Paper
                        className="setup-section"
                        sx={{p: isMobile ? 2 : 3, mb: 2}}
                    >
                        <Grid container>
                            <Grid size={6}>
                                <Typography variant={isMobile ? "h5" : "h4"} component="h1">
                                    Balance
                                </Typography>
                            </Grid>
                            <Grid
                                size={6}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    mt: isMobile ? 0 : 0
                                }}
                            >
                                <div
                                    className={"setup-balance"}
                                    style={{
                                        fontSize: isMobile ? "24px" : "30px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    ${startingBalance.toLocaleString()}
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* start game button */}
                <Grid
                    size={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: isMobile ? 1 : 2
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size={isMobile ? "medium" : "large"}
                        onClick={handleStartGame}
                        sx={{
                            width: isMobile ? "100%" : "auto",
                            minWidth: isMobile ? "auto" : 400
                        }}
                    >
                        Start Game
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default GameSetup;