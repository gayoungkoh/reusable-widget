import r2wc from "@r2wc/react-to-web-component";
import { SiteOverviewChartWrapper } from "@/components/siteOverviewChart/SiteOverviewChart";

const siteOverviewChartComponent = r2wc(SiteOverviewChartWrapper, {
  shadow: "open",
});

customElements.define("site-overview-chart", siteOverviewChartComponent);
