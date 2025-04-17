export interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
}

export type LottieAnimationProps = {
  animationData: LottieAnimationData;
  width?: number | string;
  height?: number | string;
};
