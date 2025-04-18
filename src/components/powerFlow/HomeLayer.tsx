import { Image } from "@/components/Image";
import { POWER_FLOW_IMAGE_NAME } from "@/constants/powerFlow";
import styles from "@/components/powerFlow/Layer.module.css";

export const HomeLayer = () => {
  return (
    <div className={styles.layerContent}>
      <Image imageName={POWER_FLOW_IMAGE_NAME.HOME_LAYER_IMAGE} />
    </div>
  );
};
