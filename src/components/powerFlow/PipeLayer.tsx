import { POWER_FLOW_IMAGE_NAME } from "@/constants/powerFlow";
import { Image } from "@/components/Image";

export const PipeLayer = () => {
  return (
    <div className="layer-content">
      <Image imageName={POWER_FLOW_IMAGE_NAME.PIPE_LAYER_IMAGE} />
    </div>
  );
};
