export type ValueType<T> = T[keyof T];

export type PowerFlowProps = {
  siteId: string;
};

export const NETWORK_TYPE = {
  ETHERNET: 0,
  WIFI: 1,
  LTE: 2,
  UNKNOWN: -1,
} as const;

export type NetworkType = ValueType<typeof NETWORK_TYPE>;

export type PowerFlowData = {
  /** 실시간 데이터 수집 시간 */
  eventTime: string;
  /** EMS Operation Mode */
  energyControl: number;
  /** 네트워크 타입 (0: Ethernet | 1: WiFi | 2: LTE) */
  networkType: NetworkType;
  /** PV 오류 발생 여부 */
  pvFault: boolean;
  /** PV Power 값 */
  pvPower: number;
  /** 타사 PV Power 값 */
  externalPvPower: number;
  /** Battery 오류 발생 여부 */
  batteryFault: boolean;
  /** Battery Power 값 (-: 충전 | +: 방전) */
  batteryPower: number;
  /** Battery User SOC */
  batteryUserSoc: number;
  /** Battery Real SOC */
  batteryRealSoc: number;
  /** Main Load Power 값 */
  loadPower: number;
  /** Sub Load Power 값 */
  coreLoadPower: number;
  /** Grid 오류 발생 여부 */
  gridFault: boolean;
  /** Grid Power 값 (-: export | +: import) */
  gridPower: number;
  /** Grid 상태 (true: On-Grid | false: Off-Grid) */
  gridStatus: boolean | null;
  /** Generator Power 값 */
  generatorPower: number;

  /** Consumption Power 값 (Total Load 값) - 화면 표시용 */
  consumptionPower: number;
};

export type powerFlowCase = {
  isPvToBattery: boolean;
  isPvToGrid: boolean;
  isPvToLoad: boolean;
  isBatteryToGrid: boolean;
  isBatteryToLoad: boolean;
  isGridToBattery: boolean;
  isGridToLoad: boolean;
  isGeneratorToLoad: boolean;
};
