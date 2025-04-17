import { fetchSiteOverviewChart } from "@/apis/service";
import { SiteOverviewChartData } from "@/types/siteOverviewChartTypes";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { transformSiteOverviewDataToChartSeriesList } from "@/utils/chartHelper";
import { PieChart } from "@/components/PieChart";
import "@/components/siteOverviewChart/siteOverviewChart.css";

const queryClient = new QueryClient();

export const SiteOverviewChart = () => {
  const { isLoading, data = null } = useQuery<SiteOverviewChartData>({
    queryKey: ["siteOverview"],
    queryFn: fetchSiteOverviewChart,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { onlineSeriesList, offlineSeriesList } =
    transformSiteOverviewDataToChartSeriesList(data);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h3 className="chart-title">Online Sites</h3>
        <PieChart series={onlineSeriesList} />
      </div>
      <div className="chart-wrapper">
        <h3 className="chart-title">Offline Sites</h3>
        <PieChart series={offlineSeriesList} />
      </div>
    </div>
  );
};

export const SiteOverviewChartWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SiteOverviewChart />
    </QueryClientProvider>
  );
};
