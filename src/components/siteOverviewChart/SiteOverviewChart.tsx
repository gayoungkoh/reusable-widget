import { fetchSiteOverviewChart } from "@/apis/service";
import { SiteOverviewChartData } from "@/types/siteOverviewChartTypes";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { transformSiteOverviewDataToChartSeriesList } from "@/utils/chartHelper";
import { PieChart } from "@/components/PieChart";
import styles from "@/components/siteOverviewChart/SiteOverviewChart.module.css";

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
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Online Sites</h3>
        <PieChart series={onlineSeriesList} />
      </div>
      <div className={styles.chartWrapper}>
        <h3 className={styles.chartTitle}>Offline Sites</h3>
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
