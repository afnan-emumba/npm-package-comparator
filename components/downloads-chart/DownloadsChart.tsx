import { PackageDetails } from "@/types/interfaces";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface DownloadsChartProps {
  packages: PackageDetails[];
}

const DownloadsChart = ({ packages }: DownloadsChartProps) => {
  const data = packages[0].downloads.map((download, index) => ({
    date: format(new Date(download.from), "yyyy-MM-dd"),
    [packages[0].name]: download.count,
    [packages[1]?.name]: packages[1]?.downloads[index]?.count || 0,
  }));

  const formatYAxis = (tick: number) => {
    if (tick >= 1e6) return `${(tick / 1e6).toFixed(1)}M`;
    if (tick >= 1e3) return `${(tick / 1e3).toFixed(1)}K`;
    return tick.toString();
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='date' />
        <YAxis tickFormatter={formatYAxis} axisLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: "#0b121f", color: "white" }}
        />
        <Legend
          verticalAlign='top'
          align='left'
          iconType='circle'
          height={50}
        />
        <Line
          type='monotone'
          dataKey={packages[0].name}
          stroke='#33D633'
          strokeWidth={3}
        />
        {packages[1] && (
          <Line
            type='monotone'
            dataKey={packages[1].name}
            stroke='#0A78FF'
            strokeWidth={3}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DownloadsChart;
