import { POWER_FLOW_IMAGE_NAME } from "@/constants/powerFlow";
import { Image } from "@/components/Image";
import styles from "@/components/powerFlow/Layer.module.css";

export const PipeLayer = () => {
  return (
    <div className={styles.layerContent}>
      <Image imageName={POWER_FLOW_IMAGE_NAME.PIPE_LAYER_IMAGE} />
    </div>
  );
};
