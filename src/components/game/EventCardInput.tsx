import React from "react";
import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Event, InvestmentType, TimeInterval } from "../../types/types.ts";
import { isValidInvestment } from "../../utils/investmentUtils.ts";

/**
 * Props for the EventCardInput component
 */
interface EventCardProps {
  event: Event;
  investmentAmount: string;
  selectedInterval: TimeInterval;
  selectedType: InvestmentType | "";
  userBalance: number;
  onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

/**
 * EventCardInput component to display event details and allow user input for investments
 */
const EventCardInput: React.FC<EventCardProps> = ({
  event,
  investmentAmount,
  selectedInterval,
  selectedType,
  userBalance,
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
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(10px, 50px, 50px)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          {event.description}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

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
            slotProps={{
              input: {
                startAdornment: (
                  <Typography variant="body2" sx={{ mr: 1 }}>
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
    </>
  );
};

interface IntervalOptionsProps {
  selectedInterval: TimeInterval;
  onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const IntervalOptions: React.FC<IntervalOptionsProps> = ({
  selectedInterval,
  onIntervalChange,
  disabled,
}) => {
  const intervals: TimeInterval[] = [
    "3 months",
    "6 months",
    "1 year",
    "5 years",
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
      >
        {intervals.map((interval) => (
          <FormControlLabel
            key={interval}
            value={interval}
            control={<Radio size="small" />}
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
        ))}
      </RadioGroup>
    </FormControl>
  );
};

interface InvestmentTypeOptionsProps {
  selectedType: InvestmentType | "";
  onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvestmentTypeOptions: React.FC<InvestmentTypeOptionsProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const types: InvestmentType[] = ["Invest", "Short", "Skip"];

  return (
    <FormControl component="fieldset" fullWidth size="small">
      <RadioGroup name="option" value={selectedType} onChange={onTypeChange}>
        {types.map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio size="small" />}
            label={<Typography variant="body2">{type}</Typography>}
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
