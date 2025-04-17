import { SiteOverviewChartWrapper } from "@/components/siteOverviewChart/SiteOverviewChart";
import { PowerFlowWrapper } from "@/components/powerFlow/PowerFlow";

export const App = () => {
  return (
    <>
      <SiteOverviewChartWrapper />
      <div style={{ width: "300px", height: "200px" }}>
        <PowerFlowWrapper siteId="123" />
      </div>
    </>
  );
};
