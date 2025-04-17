import { PowerFlowData, PowerFlowProps } from "@/types/powerFlowTypes";
import { HomeLayer } from "@/components/powerFlow/HomeLayer";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchPowerFlow } from "@/apis/service";
import { PipeLayer } from "@/components/powerFlow/PipeLayer";
import { ProductLayer } from "@/components/powerFlow/ProductLayer";
import "@/components/powerFlow/powerFlow.css";
import { FlowLayer } from "@/components/powerFlow/FlowLayer";
const queryClient = new QueryClient();

export const PowerFlow = ({ siteId }: PowerFlowProps) => {
  const { isLoading, data = null } = useQuery<PowerFlowData>({
    queryKey: ["powerFlow", siteId],
    queryFn: () => fetchPowerFlow(siteId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="power-flow-container">
      <div className="layer-container">
        <HomeLayer />
      </div>
      <div className="layer-container">
        <PipeLayer />
      </div>
      <div className="layer-container">
        <FlowLayer />
      </div>
      <div className="layer-container">
        <ProductLayer />
      </div>
    </div>
  );
};

export const PowerFlowWrapper = ({ siteId }: PowerFlowProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PowerFlow siteId={siteId} />
    </QueryClientProvider>
  );
};
