export type ChartSeries = {
  name: string;
  y: number;
  color: string;
};

export type PieChartProps = {
  series: ChartSeries[];
};
