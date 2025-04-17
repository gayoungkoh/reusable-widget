import { LottieAnimation } from "@/components/LottieAnimation";
import pvToLoad from "@/assets/lottie/powerFlow/no-inverter_PVtoL.json";

export const FlowLayer = () => {
  return (
    <LottieAnimation animationData={pvToLoad} width="100%" height="100%" />
  );
};
