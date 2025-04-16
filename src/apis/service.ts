import { SiteOverviewChartData } from "@/types/siteOverviewTypes";
import { fetchData } from "@/utils/apiHelper";

const BASE_URL = "https://3792f998-96be-4327-8204-4d908ecf4e19.mock.pstmn.io";

export const fetchSiteOverviewChart =
  async (): Promise<SiteOverviewChartData> => {
    return await fetchData<SiteOverviewChartData>(`${BASE_URL}/site-overview`);
  };
