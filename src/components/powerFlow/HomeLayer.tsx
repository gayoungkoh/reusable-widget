import { Image } from "@/components/Image";
import { POWER_FLOW_IMAGE_NAME } from "@/constants/powerFlow";

export const HomeLayer = () => {
  return (
    <div className="layer-content">
      <Image imageName={POWER_FLOW_IMAGE_NAME.HOME_LAYER_IMAGE} />
    </div>
  );
};
