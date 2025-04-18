import r2wc from "@r2wc/react-to-web-component";
import { SiteOverviewChartWrapper } from "@/components/siteOverviewChart/SiteOverviewChart";

const siteOverviewChartComponent = r2wc(SiteOverviewChartWrapper);

customElements.define("site-overview-chart", siteOverviewChartComponent);
