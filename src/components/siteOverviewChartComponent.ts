import r2wc from "@r2wc/react-to-web-component";
import { SiteOverviewChartWrapper } from "@/components/SiteOverviewChart";

const siteOverviewChartComponent = r2wc(SiteOverviewChartWrapper, {
  shadow: "closed",
  props: {
    siteId: "number",
  },
});

customElements.define("site-overview-chart", siteOverviewChartComponent);
