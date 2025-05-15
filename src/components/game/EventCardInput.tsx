import React from "react";
import {Event, InvestmentType, TimeInterval} from "../../types/types.ts";
import {isValidInvestment} from "../../utils/investmentUtils.ts";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

/**
 * Props for the EventCardInput component
 */
interface EventCardProps {
    event: Event;
    investmentAmount: string;
    selectedInterval: TimeInterval;
    selectedType: InvestmentType | "";
    userBalance: number;
    isMobile: boolean;
    onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

/**
 * EventCardInput component to display event details and allow user input for investments
 */
const EventCardInput: React.FC<EventCardProps> = (
    {
        event,
        investmentAmount,
        selectedInterval,
        selectedType,
        userBalance,
        isMobile,
        onInvestmentChange,
        onIntervalChange,
        onTypeChange,
        onSubmit,
    }) => {
    // Check if the current selection is valid for submission
    const isValid =
        selectedType === "Skip" ||
        (selectedType &&
            selectedInterval &&
            isValidInvestment(investmentAmount, userBalance, selectedType));

    // When Skip is selected, disable other fields
    const isSkipSelected = selectedType === "Skip";

    return (
        <>
            {/* Event Description */}
            <Box
                sx={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: "1rem",
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    fontSize={isMobile ? "clamp(.5rem, .8rem, .8rem)" : "clamp(10px, 40px, 40px)"}
                    sx={{
                        m: 0,
                        p: 0,
                        fontWeight: "bold"
                    }}
                >
                    {event.description}
                </Typography>
            </Box>

            <Divider sx={{mb: isMobile ? "0" : "3px"}}/>

            {isMobile ?
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Months to Invest
                        </Typography>
                        <IntervalOptions
                            selectedInterval={selectedInterval}
                            onIntervalChange={onIntervalChange}
                            disabled={isSkipSelected}
                            isMobile={isMobile}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            Investment Type
                        </Typography>
                        <InvestmentTypeOptions
                            selectedType={selectedType}
                            onTypeChange={onTypeChange}
                            isMobile={isMobile}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            type="number"
                            value={investmentAmount}
                            onChange={onInvestmentChange}
                            placeholder="Investment amount"
                            fullWidth
                            disabled={isSkipSelected}
                            size="small"
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                    margin: 0,
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <Typography variant="body2" sx={{mr: 1}}>
                                            $
                                        </Typography>
                                    ),
                                },
                            }}
                        />

                        <Button
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            size="medium"
                            fullWidth
                            disabled={!isValid}
                        >
                            CONTINUE
                        </Button>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={2}>
                    {/* Investment Intervals */}
                    <Grid size={4}>
                        <Typography variant="subtitle1" fontWeight="medium">
                            Investment Period
                        </Typography>
                        <IntervalOptions
                            selectedInterval={selectedInterval}
                            onIntervalChange={onIntervalChange}
                            disabled={isSkipSelected}
                            isMobile={isMobile}
                        />
                    </Grid>

                    {/* Investment Types */}
                    <Grid size={4}>
                        <Typography variant="subtitle1" fontWeight="medium">
                            Investment Type
                        </Typography>
                        <InvestmentTypeOptions
                            selectedType={selectedType}
                            onTypeChange={onTypeChange}
                        />
                    </Grid>

                    {/* Investment Amount and Submit Button */}
                    <Grid size={4}>
                        <Typography variant="subtitle1" fontWeight="medium">
                            Investment Amount
                        </Typography>

                        <TextField
                            type="number"
                            value={investmentAmount}
                            onChange={onInvestmentChange}
                            placeholder="Enter amount"
                            fullWidth
                            disabled={isSkipSelected}
                            size="small"
                            sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                    display: "none",
                                    margin: 0,
                                },
                                "& input[type=number]": {
                                    MozAppearance: "textfield",
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <Typography variant="body2" sx={{mr: 1}}>
                                            $
                                        </Typography>
                                    ),
                                },
                            }}
                        />

                        <Button
                            onClick={onSubmit}
                            variant="contained"
                            color="primary"
                            size="medium"
                            fullWidth
                            disabled={!isValid}
                        >
                            CONTINUE
                        </Button>
                    </Grid>
                </Grid>
            }
        </>
    );
};

interface IntervalOptionsProps {
    selectedInterval: TimeInterval;
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    isMobile: boolean;
}

const IntervalOptions: React.FC<IntervalOptionsProps> = (
    {
        selectedInterval,
        onIntervalChange,
        disabled,
        isMobile,
    }) => {
    const intervals: TimeInterval[] = [
        "3 months",
        "6 months",
        "1 year",
        "5 years",
    ];
    const mobileDisplayLabels: string[] = [
        "3",
        "6",
        "12",
        "60",
    ];

    return (
        <FormControl
            component="fieldset"
            disabled={disabled}
            fullWidth
            size="small"
        >
            <RadioGroup
                name="interval"
                value={selectedInterval}
                onChange={onIntervalChange}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: isMobile ? "row" : "column",
                    gap: isMobile ? 1 : 0.5,
                }}
            >
                {isMobile
                    ?
                    intervals.map((interval, index) => (
                        <FormControlLabel
                            key={interval}
                            value={interval}
                            control={
                                <Radio
                                    size="small"
                                    sx={{
                                        "&": {padding: 0, display: "none"},
                                        "& .MuiSvgIcon-root": {
                                            display: "none",
                                        }
                                    }}
                                />
                            }
                            label={<Typography variant="body2">{mobileDisplayLabels[index]}</Typography>}
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 1,
                                height: "36px",
                                width: "20%",
                                margin: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 0,
                                "& .MuiFormControlLabel-label": {
                                    position: "static",
                                    textAlign: "center",
                                },
                                ...(selectedInterval === interval && {
                                    border: "1px solid #3f51b5",
                                    bgcolor: "rgba(63, 81, 181, 0.08)",
                                }),
                            }}
                        />
                    ))
                    :
                    intervals.map((interval) => (
                        <FormControlLabel
                            key={interval}
                            value={interval}
                            control={<Radio size="small"/>}
                            label={<Typography variant="body2">{interval}</Typography>}
                            sx={{
                                border: "1px solid #e0e0e0",
                                borderRadius: 1,
                                mb: 0.5,
                                height: "36px",
                                width: "100%",
                                margin: 0,
                                "& .MuiFormControlLabel-label": {
                                    position: "absolute",
                                    left: "36px",
                                },
                                ...(selectedInterval === interval && {
                                    border: "1px solid #3f51b5",
                                    bgcolor: "rgba(63, 81, 181, 0.08)",
                                }),
                            }}
                        />
                    ))

                }
            </RadioGroup>
        </FormControl>
    );
};

interface InvestmentTypeOptionsProps {
    selectedType: InvestmentType | "";
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isMobile?: boolean;
}

const InvestmentTypeOptions: React.FC<InvestmentTypeOptionsProps> = (
    {
        selectedType,
        onTypeChange,
        isMobile,
    }) => {
    const types: InvestmentType[] = ["Invest", "Short", "Skip"];

    return (
        <FormControl component="fieldset" fullWidth size="small">
            <RadioGroup
                name="option"
                value={selectedType}
                onChange={onTypeChange}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: isMobile ? "row" : "column",
                    gap: isMobile ? 1 : 0.5,
                }}
            >
                {types.map((type) => (
                    <FormControlLabel
                        key={type}
                        value={type}
                        control={
                            isMobile ? (
                                <Radio
                                    size="small"
                                    sx={{
                                        "&": {padding: 0, display: "none"},
                                        "& .MuiSvgIcon-root": {
                                            display: "none",
                                        },
                                    }}
                                />
                            ) : (
                                <Radio size="small"/>
                            )
                        }
                        label={<Typography variant="body2">{type}</Typography>}
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            margin: 0,
                            mb: isMobile ? 0.5 : 0,
                            height: "36px",
                            width: isMobile ? "30%" : "100%",
                            display: isMobile ? "flex" : "block",
                            justifyContent: isMobile ? "center" : "flex-start",
                            alignItems: isMobile ? "center" : "flex-start",
                            "& .MuiFormControlLabel-label": {
                                position: isMobile ? "static" : "absolute",
                                left: isMobile ? "auto" : "36px",
                                textAlign: isMobile ? "center" : "left"
                            },
                            ...(selectedType === type && {
                                border: "1px solid #3f51b5",
                                bgcolor: "rgba(63, 81, 181, 0.08)",
                            }),
                        }}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default EventCardInput;
