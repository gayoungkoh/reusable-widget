import { CHART_COLORS } from "@/constants/color";
import { ChartSeries, SiteOverviewChartData } from "@/types/siteOverviewTypes";
import { Options } from "highcharts";

// Chart configuration constants
const CHART_CONFIG = {
  PIE: {
    SIZE: "100%",
    BORDER_WIDTH: 1,
    FONT_SIZE: "0.875rem",
  },
  RESPONSIVE: {
    MAX_WIDTH: 500,
  },
} as const;

// Default chart options that can be reused
const DEFAULT_CHART_OPTIONS: Partial<Options> = {
  chart: {
    type: "pie",
  },
  title: {
    text: "",
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    borderColor: CHART_COLORS.TOOLTIP_BORDER,
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
};

export const getChartOptions = (chartSeriesList: ChartSeries[]): Options => {
  return {
    ...DEFAULT_CHART_OPTIONS,
    plotOptions: {
      pie: {
        size: CHART_CONFIG.PIE.SIZE,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> : {point.y}",
        },
        borderWidth: CHART_CONFIG.PIE.BORDER_WIDTH,
        cursor: "pointer",
      },
    },
    series: [
      {
        type: "pie",
        data: chartSeriesList,
      },
    ],
  };
};

export const transformSiteOverviewDataToChartSeriesList = (
  data: SiteOverviewChartData
): { onlineSeriesList: ChartSeries[]; offlineSeriesList: ChartSeries[] } => {
  const {
    onRunCnt,
    onWarnCnt,
    onErrCnt,
    disconRunCnt,
    disconWarnCnt,
    disconErrCnt,
    offlineCnt,
    stdCnt,
  } = data;

  const createSeriesItem = (
    name: string,
    value: number,
    color: string
  ): ChartSeries => ({
    name,
    y: value,
    color,
  });

  const onlineSeriesList: ChartSeries[] = [
    createSeriesItem("Normal", onRunCnt, CHART_COLORS.NORMAL),
    createSeriesItem("Warning", onWarnCnt, CHART_COLORS.WARNING),
    createSeriesItem("Error", onErrCnt, CHART_COLORS.ERROR),
  ];

  const offlineSeriesList: ChartSeries[] = [
    createSeriesItem("Normal", disconRunCnt, CHART_COLORS.NORMAL),
    createSeriesItem("Warning", disconWarnCnt, CHART_COLORS.WARNING),
    createSeriesItem("Error", disconErrCnt, CHART_COLORS.ERROR),
    createSeriesItem("Offline", offlineCnt, CHART_COLORS.OFFLINE),
    createSeriesItem("Incomplete", stdCnt, CHART_COLORS.INCOMPLETE),
  ];

  return {
    onlineSeriesList,
    offlineSeriesList,
  };
};
