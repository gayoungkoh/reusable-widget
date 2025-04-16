export type SiteOverviewChartData = {
  incompleteTestCount: number;
  disconErrCnt: number;
  stdCnt: number;
  onErrCnt: number;
  completeTestCount: number;
  onWarnCnt: number;
  disconRunCnt: number;
  totSiteCnt: number;
  disconWarnCnt: number;
  sleepCnt: number;
  offlineCnt: number;
  completeCustomerCount: number;
  onRunCnt: number;
  incompleteCustomerCount: number;
};

export type ChartSeries = {
  name: string;
  y: number;
  color: string;
};

export type PieChartProps = {
  series: ChartSeries[];
};
