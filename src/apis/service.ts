import { BASE_URL } from "@/constants/api";
import { PowerFlowData } from "@/types/powerFlowTypes";
import { SiteOverviewChartData } from "@/types/siteOverviewChartTypes";
import { fetchData } from "@/utils/apiHelper";

export const fetchSiteOverviewChart =
  async (): Promise<SiteOverviewChartData> => {
    return await fetchData<SiteOverviewChartData>(`${BASE_URL}/site-overview`);
  };

export const fetchPowerFlow = async (
  siteId: string
): Promise<PowerFlowData> => {
  return await fetchData<PowerFlowData>(`${BASE_URL}/realtime/${siteId}`);
};
