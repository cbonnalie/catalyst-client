import React from "react";
import {Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis,} from "recharts";
import {GAME_CONSTANTS, InvestmentHistory} from "../../types/types";
import {formatCurrency} from "../../utils/investmentUtils";

interface CustomTooltipProps extends TooltipProps<any, any> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

/**
 * Custom tooltip for the chart
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="custom-tooltip">
      <p className="label">{`Turn: ${label}`}</p>
      <p className="intro">{`Balance: ${formatCurrency(payload[0].value)}`}</p>
    </div>
  );
};

/**
 * Calculates the gradient offset for the chart coloring
 * @param data Balance history data
 * @param threshold Threshold value for color change
 * @returns The offset value for gradient
 */
const calculateGradientOffset = (
  data: InvestmentHistory[],
  threshold: number,
): number => {
  if (data.length === 0) return 0;

  const dataMax = Math.max(...data.map((i) => i.balance));
  const dataMin = Math.min(...data.map((i) => i.balance));

  // If all values are below threshold
  if (dataMax <= threshold) {
    return 0;
  }

  // If all values are above threshold
  if (dataMin >= threshold) {
    return 1;
  }

  // Calculate the relative position of threshold between min and max
  return (dataMax - threshold) / (dataMax - dataMin);
};

interface LineChartProps {
  data: InvestmentHistory[];
}

/**
 * Renders a line chart showing investment balance over time
 */
export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const minBalance =
    data.length > 0 ? Math.min(...data.map((item) => item.balance)) : 0;

  const threshold = GAME_CONSTANTS.BALANCE_THRESHOLD;
  const gradientOffset = calculateGradientOffset(data, threshold);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="turn" tick={false} axisLine={false} />
        <YAxis
          domain={[
            Math.min(minBalance * 0.9, threshold * 0.9),
            Math.max(threshold * 1.1, minBalance * 1.1),
          ]}
          tickFormatter={(value) => value.toFixed(0)}
          axisLine={false}
          tick={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={threshold} stroke="gray" strokeDasharray="3 3" />

        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={gradientOffset} stopColor="green" stopOpacity={0.8} />
            <stop offset={gradientOffset} stopColor="red" stopOpacity={0.8} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="balance"
          stroke="black"
          fill="url(#splitColor)"
          baseValue={threshold}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

