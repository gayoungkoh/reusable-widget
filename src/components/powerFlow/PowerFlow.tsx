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
import { FlowLayer } from "@/components/powerFlow/FlowLayer";
import styles from "@/components/powerFlow/PowerFlow.module.css";

const queryClient = new QueryClient();

export const PowerFlow = ({ "site-id": siteId }: PowerFlowProps) => {
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
    <div className={styles.powerFlowContainer}>
      <div className={styles.layerContainer}>
        <HomeLayer />
      </div>
      <div className={styles.layerContainer}>
        <PipeLayer />
      </div>
      <div className={styles.layerContainer}>
        <FlowLayer />
      </div>
      <div className={styles.layerContainer}>
        <ProductLayer />
      </div>
    </div>
  );
};

export const PowerFlowWrapper = ({ "site-id": siteId }: PowerFlowProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PowerFlow site-id={siteId} />
    </QueryClientProvider>
  );
};
