import { LottieAnimationProps } from "@/types/lottieTypes";
import Lottie from "lottie-react";

export const LottieAnimation = ({
  animationData,
  width = "100%",
  height = "100%",
}: LottieAnimationProps) => {
  return <Lottie style={{ width, height }} animationData={animationData} />;
};
