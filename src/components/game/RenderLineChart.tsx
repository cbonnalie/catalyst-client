import {InvestmentHistory} from "../../types/types.ts";
import {LineChart} from "./LineChart.tsx";

/**
 * Helper function to render the line chart (for backward compatibility)
 */
export const renderLineChart = (data: InvestmentHistory[]) => {
    return <LineChart data={data}/>;
};